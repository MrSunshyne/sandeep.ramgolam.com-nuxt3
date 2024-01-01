const events = [
  {
    event_date: "04/01/2015",
    event_name: "Developers Conference 2015",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Front-end Tools & Workflow",
    description:
      "The idea is to give developers a glimpse of modern tools & techniques made that greatly improves productivity and bring back the fun in front-end development.",
    links: [
      {
        title: "Slides",
        url: "http://www.slideshare.net/MrSunshyne/front-end-tipstrickstools",
      },
      {
        title: "Conference Schedule",
        url: "http://2015.mscc.mu/",
      },
    ],
    video: null,
  },
  {
    event_date: "10/10/2019",
    event_name: "Jury Member",
    location: "Mauritius",
    event_type: ["jury"],
    published: true,
    topic: "Krakathon 2019",
    description:
      "I was invited to be part of the amazing Jury team of the Krakathon 2019.",
    links: [
      {
        title: "Event Recap",
        url: "https://ict.io/krakathon-2019-team-kalchul-devance-ses-adversaires-de-4000-points/",
      },
    ],
    video: null,
  },
  {
    event_date: "05/05/2018",
    event_name: "Jury Member",
    location: "Mauritius",
    event_type: ["jury"],
    published: true,
    topic: "MCB InnovApp",
    description: "I was invited to be part first InnovApp competition by MCB",
    links: [],
    video: null,
  },
  {
    event_date: "05/05/2017",
    event_name: "Jury Member",
    location: "Mauritius",
    event_type: ["jury"],
    published: true,
    topic: "Web Cup 2017 Mauritius",
    description: "",
    links: [],
    video: null,
  },
  {
    event_date: "05/05/2016",
    event_name: "Jury Member",
    location: "Mauritius",
    event_type: ["jury"],
    published: true,
    topic: "Web Cup 2016 Mauritius",
    description:
      "Great technical event featuring 17 teams from Mauritius, where they had to build a web portal within 24 hours.",
    links: [],
    video: null,
  },
  {
    event_date: "09/05/2016",
    event_name: "Jury Member",
    location: "Mauritius",
    event_type: ["jury"],
    published: true,
    topic: "Prodigious Science Fair",
    description:
      "It was a great experience being part of the panel of jury that assessed 17 projects from 3 countries.",
    links: [
      {
        title: "Report by lexpress.mu",
        url: "http://www.lexpress.mu/article/290590/prodigious-science-fair-2016-foire-aux-idees",
      },
    ],
    video: null,
  },
  {
    event_date: "09/05/2013",
    event_name: "Webcup Mauritius 2013",
    location: "Mauritius",
    event_type: ["competition"],
    published: true,
    topic: "Participated in WebCup 2013",
    description: "First taste of web competition on the island",
    links: [],
    video: null,
  },
  {
    event_date: "02/02/2018",
    event_name: "Reactive Conference",
    location: "Prague, Czech Republic",
    event_type: ["attendee"],
    published: true,
    topic: "Reactive Conference, my first international conference",
    description:
      "Reactive conf was the first international conference I attended. Grateful to LSL Digital for sponsoring the travel & tickets",
    links: [],
    video: null,
  },
  {
    event_date: "10/08/2019",
    event_name: "Google Dev Fest 2019",
    location: "Mauritius",
    event_type: ["attendee"],
    published: true,
    topic: "Google Dev Fest Mauritius",
    description: "The 2nd Google Dev fest event in Mauritius",
    links: [
      {
        title: "My blog post of the event",
        url: "https://sandeep.ramgolam.com/blog/google-devfest-2019-mauritius",
      },
      {
        title: "MSCC blog post",
        url: "https://www.mscc.mu/devfest-mauritius-2019/",
      },
      {
        title: "Twitter Moment",
        url: "https://twitter.com/i/events/1180380010621763584",
      },
    ],
    video: null,
  },
  {
    event_date: "06/08/2019",
    event_name: "Switch Conference",
    location: "Mauritius",
    event_type: ["attendee"],
    published: true,
    topic: "Switch Conference",
    description: "A tech event around empowering women in tech",
    links: [
      {
        title: "Twitter Moment",
        url: "https://twitter.com/i/events/1137677881679720448",
      },
    ],
    video: null,
  },
  {
    event_date: "12/13/2018",
    event_name: "Google Dev Fest 2018",
    location: "Mauritius",
    event_type: ["attendee"],
    published: true,
    topic: "Google Dev Fest Mauritius",
    description: "The 1st Google Dev fest event in Mauritius",
    links: [
      {
        title: "MSCC blog post",
        url: "https://www.mscc.mu/devfest-mauritius-2018/",
      },
    ],
    video: null,
  },
  {
    event_date: "05/05/2015",
    event_name: "Webcup Mauritius 2015",
    location: "Mauritius",
    event_type: ["competition"],
    published: true,
    topic: "Winner WebCup 2015",
    description:
      "The first prize was achieved by incredible team effort and perseverance!",
    links: [
      {
        title: "Interview on MBC",
        url: "https://www.youtube.com/watch?v=trHTAKHKaec",
      },
    ],
    video: null,
  },
  {
    event_date: "10/22/2017",
    event_name: "Krakathon 2017",
    location: "Mauritius",
    event_type: ["competition"],
    published: true,
    topic: "4th place in the Krakathon",
    description: "We participated under the banner of Team Undefined.",
    links: [
      {
        title: "Report by ict.io",
        url: "https://ict.io/krakathon-2017-force-coders-remportent-deuxieme-edition-code-challenge/",
      },
      {
        title: "Photo album by lexpress.mu",
        url: "https://www.lexpress.mu/photos/319077/krakathon-force-coders-remportent-2e-edition#lg=1&slide=10",
      },
    ],
    video: null,
  },
  {
    event_date: "11/05/2015",
    event_name: "Webcup Inter-Island 2015 Finals",
    location: "Mayottes",
    event_type: ["competition"],
    published: true,
    topic: "2nd place WebCup Inter-Island Finals",
    description:
      "The first prize was achieved by incredible team effort and perseverance!",
    links: [
      {
        title: "Official report by Webcup Org",
        url: "https://www.webcup.fr/finale-webcup-2015/mayotte-remporte-la-finale-internationale-de-la-webcup-2015-2026.html",
      },
    ],
    video: null,
  },
  {
    event_date: "05/01/2016",
    event_name: "Developers Conference 2016",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "lexpress.mu - the story of decks and card",
    description:
      "A presentatoin about an awesome front-end tool we used to build lexpress.mu, namely : Flint.gs. We'll also talk about our inhouse decks & cards system and some upcoming features of lexpress.mu",
    links: [
      {
        title: "Conference Schedule",
        url: "http://2016.mscc.mu/",
      },
      {
        title: "Slides",
        url: "https://www.slideshare.net/MrSunshyne/a-story-of-deck-cards",
      },
    ],
    video: "",
  },
  {
    event_date: "03/01/2017",
    event_name: "Developers Conference 2017",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Panel Discussion : Web Development in Mauritius",
    description:
      "I organized and hosted a panel discussion regrouping experienced professionals of the Web working in Mauritius",
    links: [
      {
        title: "Conference Schedule",
        url: "http://2017.mscc.mu/",
      },
    ],
    video: "",
  },
  {
    event_date: "05/01/2018",
    event_name: "Developers Conference 2018",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Front-end Development - Beyond the Basics",
    links: [
      {
        title: "Conference Schedule",
        url: "http://2018.mscc.mu",
      },
    ],
    video: "",
  },
  {
    event_date: "05/01/2018",
    event_name: "Developers Conference 2018",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Power User moves for developers.",
    links: [
      {
        title: "Conference Schedule",
        url: "http://2018.mscc.mu",
      },
    ],
    video: "",
  },
  {
    event_date: "04/01/2019",
    event_name: "Developers Conference 2019",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Lightining Talks",
    description:
      "This time at the developers conference I hosted the Lightning talks that included 7 short talks about interesting topics. I had a lot of fun preparing this session and we even made intro videos for each speaker",
    links: [
      {
        title: "Conference Schedule",
        url: "http://2019.mscc.mu",
      },
      {
        title: "Blog post by Ish Sookun",
        url: "https://hacklog.in/devcon-2019-lightning-talks/",
      },
      {
        title: "Intro Videos for Lightning Talks",
        url: "https://twitter.com/__Sun__/status/1117460206395494400",
      },
      {
        title: "Tweet by Vanessa C",
        url: "https://twitter.com/VanessaChellen/status/1117045231592013825",
      },
    ],
    video: "",
  },
  {
    event_date: "07/20/2019",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Trigonometry in CSS",
    description:
      "During between the preplanned sessions I shared my experience regarding how to handle Trigonometry in CSS using traditional mathemetics techniques and proceeded to show how it could be applied to animations in a live demo.",
    links: [
      {
        title: "Meetup Event",
        url: "https://www.meetup.com/frontendcodersmauritius/events/263025328/",
      },
      {
        title: "Twitter Moment",
        url: "https://twitter.com/i/events/1152597473522642944",
      },
    ],
    video: "",
  },
  {
    event_date: "06/22/2019",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Design Systems and how to build one",
    description:
      "An lively interactive session about current trends in Front-end techsphere, mainly design systems and how the MSCC Jobs website was designed in Figma",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/261929807/",
      },
      {
        title: "Photo Album",
        url: "https://www.meetup.com/frontendcodersmauritius/photos/30097275/482456959/",
      },
    ],
    video: "",
  },
  {
    event_date: "02/03/2018",
    event_name: "Front-End Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Building a keylogger using CSS",
    description:
      "How to use abuse a css functionality to create a keylogger that can track clients from the serve using CSS!",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/247184015/",
      },
      {
        title: "Photo Album",
        url: "https://www.meetup.com/frontendcodersmauritius/photos/all_photos/?photoAlbumId=28549290",
      },
    ],
    video: "",
  },
  {
    event_date: "10/09/2016",
    event_name: "Front-End Mauritius Meetup",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "AureliaJS & GulpJS",
    description:
      "A look into then-emerging framework Aurelia and live demo of a photo resizing application.",
    links: [
      {
        title: "Github Repo of Live Demo",
        url: "https://github.com/MrSunshyne/frontend-meetup-demo",
      },
    ],
    video: "",
  },
  {
    event_date: "11/08/2018",
    event_name: "Code Saturday by MSCC",
    location: "Digital Factory, Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Modern front end development ",
    description:
      "Spoke about CSS custom properties and it's lesser known features and annouced Vue Cli 3 !",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/MauritiusSoftwareCraftsmanshipCommunity/events/253335385/",
      },
      {
        title: "Slides",
        url: "https://www.slideshare.net/MrSunshyne/front-end-dev-and-stuff",
      },
      {
        title: "Photo Album",
        url: "https://www.facebook.com/bildulloo/media_set?set=a.2072068246136753&type=3",
      },
    ],
    video: "",
  },
  {
    event_date: "12/21/2019",
    event_name: "GDG Mauritius Meetup",
    location: "Flying Dodo, Mauritius",
    event_type: ["attendee"],
    published: true,
    topic: "Go: All you ever wanted to know but didn't dare to ask...",
    description:
      "Attended a very lively event organized by Gopher Mauritius and MSCC",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/GDG-Mauritius/events/266919961/",
      },
      {
        title: "Blog Post",
        url: "/blog/go-gdg-meetup",
      },
    ],
    video: "",
  },
  {
    event_date: "02/15/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Contributing to Open Source & Data visualizations with VueJS",
    description:
      "In this event I spoke about open source contributions, data visualization and how to contribute to the DevCon Website",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/268295472/?",
      },
      {
        title: "Photo Album",
        url: "https://photos.app.goo.gl/pSAS8nZ7o4zatDKF7",
      },
    ],
    video: "",
  },
  {
    event_date: "04/21/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Vue 3 Composition API & Lobotomized Owl CSS Selector",
    description:
      "A short overview of the new Composition API was given as well as a sneak peek of Portals/Teleport and Suspense",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/270040148/",
      },
    ],
    video: null,
  },
  {
    event_date: "05/05/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Vue 3 Portals + Vite - vuejs, development without a bundler",
    description:
      "I helped organize this meetup as well as give two talks about the latest hottest features coming for Vue 3",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/270381025/",
      },
    ],
    video: null,
  },
  {
    event_date: "06/02/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Front-end open discussions",
    description:
      "Helped organize this meetup and run the open discussion about front-end topics during the last session",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/270971949/",
      },
    ],
    video: null,
  },
  {
    event_date: "07/21/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "SPAs vs SSR discussions",
    description:
      "Organize this meetup and get the conversation going about the need for SSR in modern SPAs",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/271940927/",
      },
    ],
    video: null,
  },
  {
    event_date: "09/10/2020",
    event_name: "Virtual Developers Conference",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Vue 3.0 - a glimpse of the Composition API",
    description:
      "For this session I paired with Kushul to talk about new upcoming features of Vue 3.0",
    links: [
      {
        title: "Website",
        url: "https://conference.mscc.mu",
      },
    ],
    video: null,
  },
  {
    event_date: "10/10/2020",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "FEC October Meetup",
    description: "Organize this meetup",
    links: [
      {
        title: "Meetup Page",
        url: "https://www.meetup.com/frontendcodersmauritius/events/273573909/",
      },
    ],
    video: null,
  },
  {
    event_date: "10/23/2020",
    event_name: "Anou Participe dans Hacktoberfest",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Open Source in Mauritius",
    description: "Help organize and co-host",
    links: [
      {
        title: "MLH Event Page",
        url: "https://organize.mlh.io/participants/events/5022-anou-participe-dans-hacktoberfest",
      },
    ],
    video: null,
  },
  {
    event_date: "04/09/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Open Data in Mauritius",
    description: "Host and Speak at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://front-end-coders-mauritius.netlify.app/event/232560779",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-april-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "05/21/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Vite for Front-end Development",
    description: "Host and Speak at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/17",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-may-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "06/25/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Infinite themes with CSS Variables",
    description: "Host and Speak at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/36",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-june-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "07/23/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Laravel for Front-end Development",
    description: "Host at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/37",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-july-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "08/20/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Bun a fast all-in-one JavaScript runtime",
    description: "Host and Speaker at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/38",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-september",
      },
    ],
    video: null,
  },
  {
    event_date: "09/24/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Upcoming Features of CSS",
    description: "Host and Speaker at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/39",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-september",
      },
    ],
    video: null,
  },
  {
    event_date: "11/23/2022",
    event_name: "Developers Conference 2022",
    location: "Mauritius",
    event_type: ["speaking"],
    published: true,
    topic: "Modern Front-End Development With Vitejs",
    description:
      "I spoke about the rise of vite and how it is being used to build modern front-end applications",
    links: [
      {
        title: "Website",
        url: "https://2022.mscc.mu/agenda/302541",
      },
    ],
    video: null,
  },
  {
    event_date: "11/24/2022",
    event_name: "Developers Conference 2022",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Lightning Talks 2022",
    description:
      "I organized and hosted the lightning talks session at the conference",
    links: [
      {
        title: "Website",
        url: "https://2022.mscc.mu/agenda/302537",
      },
      {
        title: "Blogpost",
        url: "https://sandeep.ramgolam.com/blog/lightning-talks-at-devcon-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "10/29/2022",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["organizer"],
    published: true,
    topic: "October Meetup",
    description: "Host at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/40",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-october-2022",
      },
    ],
    video: null,
  },
  {
    event_date: "02/25/2023",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "Frontend News",
    description: "Host and Speaker at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/41",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/front-end-coders-meetup-february-2023/",
      },
    ],
    video: null,
  },
  {
    event_date: "03/25/2023",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["speaking", "organizer"],
    published: true,
    topic: "WebContainers",
    description: "Host and Speaker at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/42",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/frontend-coders-meetup-march-2023/",
      },
    ],
    video: null,
  },
  {
    event_date: "04/08/2023",
    event_name: "MSCC Meetup",
    location: "Mauritius",
    event_type: ["attendee"],
    published: true,
    topic: "The Power of AI",
    description: "I attended this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://www.meetup.com/mauritiussoftwarecraftsmanshipcommunity/events/291590129/",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/the-power-of-ai-mscc-meetup/",
      },
    ],
    video: null,
  },
  {
    event_date: "04/25/2023",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["organizer"],
    published: true,
    topic: "Interviews / CVs / Freelancing",
    description: "Host and Organize this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/43",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/developers-institute-x-front-end-coders-april-meetup-2023/",
      },
    ],
    video: null,
  },
  {
    event_date: "05/20/2023",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["organizer"],
    published: true,
    topic: "Git, CVs & getting in to tech",
    description: "Host and Speak at this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/44",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/mdx-frontend-coders-may-2023/",
      },
    ],
    video: null,
  },
  {
    event_date: "06/01/2023",
    event_name: "JSNation Amsterdam 2023",
    location: "Amsterdam",
    event_type: ["attendee"],
    published: true,
    topic: "JSNation Amsterdam 2023",
    description: "Attended this conference",
    links: [
      {
        title: "Event Page",
        url: "https://jsnation.com/",
      },
      {
        title: "Blog Post",
        url: "https://sandeep.ramgolam.com/blog/attending-jsnation-in-amsterdam/",
      },
    ],
    video: null,
  },
  {
    event_date: "06/24/2023",
    event_name: "Front-end Coders Meetup",
    location: "Mauritius",
    event_type: ["organizer"],
    published: true,
    topic: "React, Zustand, FP & Marketing",
    description: "Host and Organize this meetup",
    links: [
      {
        title: "Event Page",
        url: "https://frontend.mu/meetup/45",
      },
    ],
    video: null,
  },
];

export default events;
