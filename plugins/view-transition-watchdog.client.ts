// Chrome freezes rendering from the moment a view transition starts until
// the new page has finished loading. If that takes too long (slow payload,
// or a navigation where `page:finish` never fires), the browser holds the
// freeze until it force-aborts the transition after ~4s. Skip the animation
// once it overstays — skipTransition() unfreezes rendering but still lets
// the navigation itself complete.
export default defineNuxtPlugin((nuxtApp) => {
  let watchdog: ReturnType<typeof setTimeout> | undefined;

  nuxtApp.hook("page:view-transition:start", (transition) => {
    clearTimeout(watchdog);
    watchdog = setTimeout(() => transition.skipTransition(), 1500);
  });

  nuxtApp.hook("page:finish", () => clearTimeout(watchdog));
});
