import type { Ref } from "vue";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadScript(): Promise<TurnstileApi> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("turnstile_load_failed"));
    };
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile_load_failed"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Lazy Cloudflare Turnstile: the script is only injected once the visitor
 * interacts with the comment form (via preload()), so blog pages stay light.
 * The widget renders in interaction-only mode and runs on getToken().
 */
export function useTurnstile(container: Ref<HTMLElement | null>) {
  const config = useRuntimeConfig();
  const siteKey = config.public.turnstileSiteKey;

  let widgetId: string | null = null;
  let pending: { resolve: (token: string) => void; reject: (error: Error) => void } | null =
    null;

  async function ensureWidget(): Promise<TurnstileApi> {
    const turnstile = await loadScript();
    if (widgetId === null && container.value) {
      widgetId = turnstile.render(container.value, {
        sitekey: siteKey,
        execution: "execute",
        appearance: "interaction-only",
        theme: "auto",
        callback: (token: string) => {
          pending?.resolve(token);
          pending = null;
        },
        "error-callback": () => {
          pending?.reject(new Error("turnstile_error"));
          pending = null;
        },
        "expired-callback": () => {
          if (widgetId !== null) window.turnstile?.reset(widgetId);
        },
      });
    }
    return turnstile;
  }

  function preload() {
    ensureWidget().catch(() => {});
  }

  async function getToken(timeoutMs = 30_000): Promise<string> {
    const turnstile = await ensureWidget();
    if (widgetId === null) throw new Error("turnstile_error");
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => {
        pending = null;
        reject(new Error("turnstile_timeout"));
      }, timeoutMs);
      pending = {
        resolve: (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      };
      turnstile.execute(widgetId!);
    });
  }

  // Tokens are single-use — call after any failed submission before retrying.
  function reset() {
    if (widgetId !== null) window.turnstile?.reset(widgetId);
  }

  onUnmounted(() => {
    if (widgetId !== null) window.turnstile?.remove(widgetId);
    widgetId = null;
    pending = null;
  });

  return { preload, getToken, reset };
}
