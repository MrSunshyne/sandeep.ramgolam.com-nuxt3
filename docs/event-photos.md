# Event photos

Each event in `content/events/*.json` can carry up to two photos that show me at the event:

```json
"photos": [
  { "src": "/content/images/events/2022-04-09_speaking-1.webp", "alt": "…", "credit": "frontend.mu", "source": "https://coders.mu/meetup/2022-april" }
]
```

- Photos already used in a blog post are referenced in place (no `credit`/`source`, they are mine or already credited in the post). The exception is files with a space in the name: the dev server's image resizer (IPX) hangs on those, so they get a copy under `public/content/images/events/` instead.
- The event rows (`components/event-row.vue`) show the photos as thumbnails through `<NuxtImg>`. Some blog originals are 10+ MB PNGs, so both the thumbnail and the larger copy behind it go through the image provider.
- Everything else is resized to at most 1280px and stored as WebP in `public/content/images/events/<event-id>-<n>.webp`, with `credit` and `source` pointing at where the photo was found.
- Every photo was checked by eye; a face-matching pass was only used to shortlist candidates.

## Coverage

59 of the 92 events have photos: 49 with two and 10 with one, 108 photos in all. 22 of them are blog images referenced in place; the other 86 are new files in `public/content/images/events/` (6.1 MB).

Where the photos came from:

- **frontend.mu albums** ([frontendmu/google-photos-sync](https://github.com/frontendmu/google-photos-sync)): the 2022–2025 Front-end Coders meetups.
- **This blog** (`public/content/images/`): meetup recaps, JSNation 2023, Google I/O Connect Berlin, DevCon 2024, the 2024 beach meetup, the February and May 2026 meetups.
- **meetup.com albums**: the 2016–2019 Front-End Coders meetups (and the [frontendmu/meetupFEC](https://github.com/frontendmu/meetupFEC) mirror), DevCon 2015 and Code Saturday 2018 (MSCC).
- **Conference and community sites**: GDG Mauritius DevFest galleries (2025, 2026), the `2026.mscc.mu/photos` album, Ish Sookun's DevCon recaps on sysadmin-journal.com (via the Wayback Machine), ict.io, lexpress.mu, LinkedIn posts by SD Worx and Mobile Horizon.
- **Recordings** (stills): WebCup 2015 (MBC news, WebCup YouTube), WebCup 2017, the April 2020 online meetup, DevCon 2019 lightning talks, Virtual DevCon 2020, DevCon 2022 aftermovie, the March 2024 Twitch talk, BTrust DevDay 2025, the September 2026 meetup video.

## Worth replacing when better photos turn up

- **Video stills**: 2015-05-05, 2015-11-05, 2017-05-05, 2019-04-01 (second photo), 2020-04-21, 2020-09-10 (webcam is small), 2022-11-23, 2024-03-28, 2025-12-02, 2026-09-19 (first photo).
- **Low resolution**: 2015-04-01 (533×800), 2017-03-01 (500px), the LinkedIn images for 2025-05-17 and 2026-08-22 (800px).
- **Identity not certain**: 2017-03-01 (panel, probably me holding the mic), 2017-05-05 (jury round, grey hoodie on the left), 2016-05-01 (lexpress.mu booth, back row left; the photo was published in January 2017 and most likely shows DevCon 2016).
- **Only one photo**: 2016-05-01, 2017-03-01, 2017-05-05, 2017-10-22, 2020-02-15, 2020-04-21, 2020-10-10, 2022-11-23, 2025-06-27, 2025-09-07.

## Events without photos

Nothing public showed me at these events. Most of them likely have photos behind a login: the MSCC and WebCup Facebook pages, the Front-end Coders Facebook group, LinkedIn posts, community WhatsApp/Telegram groups, and my own Google Photos.

| Event | What was checked / lead |
| --- | --- |
| 2013-09-05 WebCup 2013 | Nothing found. WebCup 2013 may have taken place in May 2013. |
| 2016-05-05 WebCup 2016 (jury) | WebCup Maurice YouTube channel; nothing showing me. |
| 2016-09-05 Prodigious Science Fair (jury) | I took the photos, so I'm not in them. The fair was on 29 September 2016 ([lexpress.mu](http://www.lexpress.mu/article/290590/prodigious-science-fair-2016-foire-aux-idees)). |
| 2018-02-02 Reactive Conference | Nothing found. |
| 2018-05-01 DevCon 2018 | Only the [ict.io group photo](https://ict.io/en/developers-conference-2018-the-final-day/), faces too small to confirm. |
| 2018-05-05 MCB InnovApp (jury) | Nothing found. |
| 2018-12-13 DevFest 2018 | One unconfirmed candidate in the [GDG event page](https://gdg.community.dev/events/details/google-gdg-mauritius-presents-devfest-mauritius-2018/) photos. DevFest 2018 was on 1 December 2018. |
| 2019-06-08 Switch Conference | Nothing found. |
| 2019-10-08 DevFest 2019 | The photos in my blog post don't show me. |
| 2019-10-10 Krakathon 2019 (jury) | Only the ict.io article header. |
| 2019-12-21 GDG Go meetup | The blog photos don't show me. |
| 2020-05-05, 2020-06-02, 2020-07-21 online meetups | The May 2020 recording on YouTube can't be downloaded (only storyboards are served). Nothing found for June and July. |
| 2020-10-23 Anou Participe dans Hacktoberfest | Nothing found. |
| 2023-04-08 MSCC meetup (The Power of AI) | The meetup.com album (34 photos) doesn't show me; I took the photos. |
| 2023-07-20 DevCon 2023 (talk and lightning talks) | No public album. The aftermovie is only available at 360p and the lightning talk hosts in it are not me. Try the MSCC Facebook albums. |
| 2023-09-23 MCB Tech Conference | Only a tiny lectern shot in my own September 2023 post. |
| 2024-07-19 DevCon 2024 Nuxt workshop | No public photos of the workshop. |
| 2024-09-28 meetup (side projects) | The album shows other presenters. |
| 2024-10-19 DevFest 2024 | Nothing public found. |
| 2024-10-26 meetup | Nothing public found. |
| 2025-04-29 online meetup (MCP server) | Nothing found. |
| 2025-06-28 GDE Summit | Nothing found. |
| 2025-10-11 Hacktoberfest by CNCF Mauritius | Possible match: [image-8](https://alexbissessur.dev/content/images/2025/10/image-8.png) in [Alex Bissessur's recap](https://alexbissessur.dev/cloud-native-hacktoberfest-2025/). Needs confirming. |
| 2025-11-29 Laravel meetup | Nothing public found. |
| 2025-12-06 CNCF meetup | Nothing public found. |
| 2026-07-01 Google Cloud Summit, 2026-07-02 GDE Summit | Nothing public found. |
| 2026-07-30 Build with Gemma (jury) | Only a whole-hackathon group photo, faces too small. |
| 2026-09-25 Programmers Day 2026 | Nothing public found yet. |
| 2026-09-26 Cloud Native Mauritius meetup | Nothing public found yet. |

## Data issues spotted along the way

Not changed here; worth checking against the sources before editing.

- **Duplicate meetup**: `2024-02-24_speaking` and `2024-03-02_organizer` are the same meetup ([coders.mu/meetup/2024-february](https://coders.mu/meetup/2024-february)).
- **Dead links**: the 27 numeric `https://coders.mu/meetup/<number>` links (in 34 event files) return 410 Gone. The `https://coders.mu/meetup/<year>-<month>` pages work.
- **Dates that look off**
  - 2015-04-01 DevCon 2015 ran 23–25 April 2015; the talk was on the 24th.
  - 2018-11-08 Code Saturday was on 11 August 2018 (day and month swapped).
  - 2016-10-09 Front-End Mauritius meetup was most likely 10 September 2016 (day and month swapped).
  - 2016-09-05 Prodigious Science Fair was on 29 September 2016.
  - 2018-12-13 DevFest 2018 was on 1 December 2018.
  - 2025-06-27 Google I/O Connect Berlin and 2025-06-28 GDE Summit: the photos are in the July 2024 post, so these are probably 2024.
  - 2025-09-07 Programmers Day 2025 was on 27 September 2025.
  - 2023-04-25 meetup: coders.mu lists it on 29 April 2023.
- **Titles**
  - DevFest 2025: the talk was "CSS is more fun than AI", co-presented with Cedric Poilly.
  - BTrust DevDay 2025: the talk was "Vibe Coding – Lessons and Experiences".
- **Missing event**: DevFest 2020 is not in the list.

## Credits and permissions

- Each photo that isn't mine carries `credit` and `source`. Show them next to the photo (or link the photo to `source`).
- Stills from TV news (MBC) and photos from lexpress.mu and LinkedIn posts belong to their publishers. Ask before publishing them, or link to the source instead.
