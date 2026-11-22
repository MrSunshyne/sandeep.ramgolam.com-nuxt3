// Builds one chronological list out of every kind of content on the site.
// Dates are parsed by hand into calendar parts instead of going through
// `Date`, so the static build (UTC) and the browser (any timezone) render
// the same day and hydration never mismatches.

export type TimelineKind =
  "post" | "event" | "project" | "career" | "education" | "wallpapers";

export type TimelineDate = {
  year: number;
  month?: number; // 1-12
  day?: number;
};

export type TimelineItem = {
  key: string;
  kind: TimelineKind;
  date: TimelineDate;
  title: string;
  meta?: string; // small line above the title (event name, company…)
  tags?: string[]; // event roles
  text?: string;
  tech?: string[]; // what a project is built with
  href?: string;
  external?: boolean;
  image?: string; // site-relative path to a thumbnail
  // Project screenshots are shown whole, at their own shape, rather than
  // cropped to the row's box. `framed`: the image already has a browser
  // window drawn around it; otherwise the page draws one showing `address`.
  screenshot?: { framed: boolean; address?: string };
};

export type TimelineYear = { year: number; items: TimelineItem[] };

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "2026-11-20T09:00:00.000Z" → 2026-11-20 (the calendar day as written)
export function parseIsoDate(value: string): TimelineDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  return m ? { year: +m[1], month: +m[2], day: +m[3] } : null;
}

// Event files store "MM/DD/YYYY"
export function parseUsDate(value: string): TimelineDate | null {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  return m ? { year: +m[3], month: +m[1], day: +m[2] } : null;
}

// "Feb 2023", "2019", "2022-present"
export function parseLooseDate(value: string): TimelineDate | null {
  const trimmed = value.trim();
  const withMonth = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/.exec(trimmed);
  if (withMonth) {
    const month = MONTHS.indexOf(
      withMonth[1][0].toUpperCase() + withMonth[1].slice(1, 3).toLowerCase(),
    );
    if (month >= 0) return { year: +withMonth[2], month: month + 1 };
  }
  const year = /^(\d{4})/.exec(trimmed);
  return year ? { year: +year[1] } : null;
}

// Sorts within a year by month then day; items without a month or day go
// after the dated ones, since all we know is that they happened that year.
function sortValue({ year, month, day }: TimelineDate) {
  return year * 10000 + (month ?? 0) * 100 + (day ?? 0);
}

export function formatTimelineDate(date: TimelineDate): string {
  if (!date.month) return "";
  const month = MONTHS[date.month - 1];
  return date.day ? `${month} ${String(date.day).padStart(2, "0")}` : month;
}

type PostInput = {
  slug: string;
  title: string;
  date: string;
  feature_image?: string | null;
};
type EventInput = {
  event_date: string;
  event_name: string;
  topic?: string;
  event_type?: string[];
  published?: boolean;
  location?: string;
  links?: { title: string; url: string }[];
  photos?: { src: string }[];
};
type ProjectInput = {
  name: string;
  url?: string;
  role?: string[];
  company?: string;
  text?: string;
  tech?: string[];
  started?: string; // "YYYY-MM-DD" (first commit) or "YYYY"
  status?: string;
  thumbnail?: string;
  framed?: boolean; // the thumbnail already has a browser window around it
};
type JobInput = {
  date_start: string;
  date_end?: string;
  job_title: string;
  company: string;
  company_website?: string;
  text?: string;
};
type EducationInput = { title: string; institution: string; year: string };
type WallpaperInput = {
  path: string;
  title: string;
  metadata?: { date?: string };
};

export type TimelineSources = {
  posts?: PostInput[];
  events?: EventInput[];
  projects?: ProjectInput[];
  jobs?: JobInput[];
  education?: EducationInput[];
  wallpapers?: WallpaperInput[];
};

export function buildTimeline(sources: TimelineSources): TimelineItem[] {
  const items: TimelineItem[] = [];

  for (const post of sources.posts ?? []) {
    const date = parseIsoDate(post.date);
    if (!date) continue;
    items.push({
      key: `post:${post.slug}`,
      kind: "post",
      date,
      title: post.title,
      href: `/blog/${post.slug}`,
      // a few posts store a placeholder instead of a path
      image: post.feature_image?.startsWith("/")
        ? post.feature_image
        : undefined,
    });
  }

  for (const event of sources.events ?? []) {
    if (!event.published) continue;
    const date = parseUsDate(event.event_date);
    if (!date) continue;
    const link = event.links?.[0]?.url;
    items.push({
      key: `event:${event.event_date}:${event.event_name}:${event.topic ?? ""}`,
      kind: "event",
      date,
      title: event.topic || event.event_name,
      meta: event.topic ? event.event_name : event.location,
      tags: event.event_type,
      href: link,
      external: !!link,
      image: event.photos?.[0]?.src,
    });
  }

  for (const project of sources.projects ?? []) {
    const date = project.started
      ? (parseIsoDate(project.started) ?? parseLooseDate(project.started))
      : null;
    if (!date) continue;
    items.push({
      key: `project:${project.name}`,
      kind: "project",
      date,
      title: project.name,
      meta:
        [
          project.role?.length
            ? `${project.role.join(", ").trim()} @ ${project.company}`
            : project.company,
          project.status === "archived" ? "archived" : undefined,
        ]
          .filter(Boolean)
          .join(" · ") || undefined,
      text: project.text,
      tech: project.tech,
      href: project.url,
      external: !!project.url,
      image: project.thumbnail
        ? `/data/projects/${project.thumbnail}`
        : undefined,
      screenshot: project.thumbnail
        ? {
            framed: !!project.framed,
            address: project.url
              ?.replace(/^https?:\/\//, "")
              .replace(/\/$/, ""),
          }
        : undefined,
    });
  }

  for (const job of sources.jobs ?? []) {
    const date = parseLooseDate(job.date_start);
    if (!date) continue;
    const company = job.company.trim();
    items.push({
      key: `career:${company}:${job.date_start}`,
      kind: "career",
      date,
      title: `${job.job_title.trim()} at ${company}`,
      meta: job.date_end
        ? `${job.date_start.trim()} – ${job.date_end.trim()}`
        : undefined,
      text: job.text,
      href: job.company_website,
      external: !!job.company_website,
    });
  }

  const seenEducation = new Set<string>();
  for (const entry of sources.education ?? []) {
    const date = parseLooseDate(entry.year);
    const key = `education:${entry.title}:${entry.institution}:${entry.year}`;
    if (!date || seenEducation.has(key)) continue;
    seenEducation.add(key);
    items.push({
      key,
      kind: "education",
      date,
      title: entry.title,
      meta: entry.institution,
    });
  }

  // Wallpapers are often added in batches, so one entry per day
  const wallpapersByDay = new Map<string, WallpaperInput[]>();
  for (const wallpaper of sources.wallpapers ?? []) {
    const day = wallpaper.metadata?.date;
    if (!day || !parseIsoDate(day)) continue;
    wallpapersByDay.set(day, [...(wallpapersByDay.get(day) ?? []), wallpaper]);
  }
  for (const [day, batch] of wallpapersByDay) {
    items.push({
      key: `wallpapers:${day}`,
      kind: "wallpapers",
      date: parseIsoDate(day)!,
      title:
        batch.length === 1
          ? `New wallpaper: ${batch[0].title}`
          : `${batch.length} new wallpapers`,
      text:
        batch.length === 1 ? undefined : batch.map((w) => w.title).join(", "),
      href: "/wallpapers",
      image: batch[0].path,
    });
  }

  return items.sort(
    (a, b) =>
      sortValue(b.date) - sortValue(a.date) || a.title.localeCompare(b.title),
  );
}

// Expects items sorted newest first, as buildTimeline returns them
export function groupTimelineByYear(items: TimelineItem[]): TimelineYear[] {
  const groups: TimelineYear[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last?.year === item.date.year) last.items.push(item);
    else groups.push({ year: item.date.year, items: [item] });
  }
  return groups;
}
