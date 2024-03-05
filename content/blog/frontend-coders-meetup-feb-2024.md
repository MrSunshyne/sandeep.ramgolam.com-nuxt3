---
title: frontend.mu x SDWorx Meetup
slug: frontend-coders-meetup-feb-2024
feature_image: /content/images/2024/03/feb-2024.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
custom_excerpt: On the 2nd of March 2024, frontend.mu hosted a meetup in the offices of SDWorx Mauritius where we spoke about Streamlit, HTMX, git Large File Systems and frontend & Open Source News.
date: 2024-03-05T20:37:23.000Z
---

After 2 months of break, and an amazing last meetup on the beach, the first frontend.mu meetup of 2024 finally happened. We had to postpone it because of the cyclone last week, which means the Feb meetup actually happened in March.

![feb-2024-thumbnail](/content/images/2024/03/feb-2024.jpg)

## Planning

Due to the postponing, there were a lot of communications to be done behind the scenes to inform everyone and make sure nobody leaves home unnecessarily. Kushul used our handy custom messaging script to ping everyone and checked for confirmation.

## Arriving at SD Worx

![Screenshot from 2024-03-06 00-35-25.png](/content/images/2024/03/Screenshot%20from%202024-03-06%2000-35-25.png)

I left home slightly later than I would have preferred, but managed to reach around 9.45am. When writing in the logbook at the entrance, I saw there were already a lot of people who joined, which was super encouraging! I joined everyone and started unpacking my laptop and keyboards. Yes Keyboards !

## The Keyboard Corner

![keyboard-corner-poster-frontendmu-meetup-2024.png](/content/images/2024/03/keyboard-corner-poster-frontendmu-meetup-2024.png)

As previously announced, we wanted to invite everyone who have nice keyboards to bring it to the event so that we could have a fun moment among nerds. In Mauritius, we never get to try multiple types of keyboards or switches at the same location. All the shops that sell keyboards do not let you try it before buying. This was a unique opportunity and it was so much fun !

![keyboards-meetup-2024-frontendmu.png](/content/images/2024/03/keyboards-meetup-2024-frontendmu.png)![keyboard-coner-2-meetup-frontendmu.png](/content/images/2024/03/keyboard-coner-2-meetup-frontendmu.png)

## Logistics

SDWorx had a really delightful setup with a big projector screen, more than 50 seats and even microphones and loudspeakers for the presenters. Yes please !

## Meetup RSVPs

The past few weeks, a few of us have been working hard to build an RSVP system that we can use for frontend  coders meetup. It's all open source and on our GitHub. We merged an[“attendance/verification” feature](https://github.com/Front-End-Coders-Mauritius/frontendmu-astro/pull/129) the previous night, and it allows someone from the organizing team to scan a qr code from attendees, and “mark them as verified”. This means they get a badge on the account, and it's trusted that they really attended the event !

![rsvp-badges-meetup-frontendmu.png](/content/images/2024/03/rsvp-badges-meetup-frontendmu.png)

Cedric was our designated Admin for the day, and he scanned the tickets of the attendees while we were getting ready to start.

## The Meetup

At around 10.30 it was time to kick off the event, and as it is customary, I greeted everyone and introduced frontend.mu and our mission statement.

![sandeep-audience-intro-meetup-feb-2024.png](/content/images/2024/03/sandeep-audience-intro-meetup-feb-2024.png)

Didier from SD Worx then addressed the audience and introduced the company and what they do.

![Screenshot from 2024-03-06 00-33-54.png](/content/images/2024/03/Screenshot%20from%202024-03-06%2000-33-54.png)

Then I took over again and summarized the community updates from the past few months so that everyone can get a sense that we try to involve as many people as possible in the meetups and anyone can participate.

![feb-2024-community-updatres.png](/content/images/2024/03/feb-2024-community-updatres.png)

## Speakers

- **Dereck Lam Hon Wah** - GIT LFS - Large File Storage Management in Version Control
- **Mootien Kasarajen** - Streamlit
- **Michaël Jules** - import 'htmx.org'
- **Sandeep Ramgolam** - Frontend News & Updates

### GIT LFS Large File Storage Management in Version Control

Dereck, long time member of the meetup, first time speaker at frontend.mu spoke about git LFS. He was very natural and confident, and addressed the audience with the ease of a seasoned presenter. I learned a few new tricks, and we probably can use on our photo album repository for frontend.mu.

![dereck-frontend-mu-presentation-2024-git.png](/content/images/2024/03/dereck-frontend-mu-presentation-2024-git.png)

His presentation was filled byte-sized information with relevant memes where it made sense. At the end he was open to questions.

### Lunch break

![feb-2024-meetup-pizza-break.png](/content/images/2024/03/feb-2024-meetup-pizza-break.png)

Food arrived one hour early, so in order not to let it get too cold, we stopped for the lunch break after the first session.

### Quiz by Cedric

We resumed the event with a quiz, hosted by Cedric, on the topic of the previous presenter. Cedric built a multiplayer real-time quiz game live his stream, and we got to play the game with all attendees during this meetup. We chose two themes, “Git” and “Batman” and there were 5 questions generated via AI for both themes.

Aditya won a 1-year JetBrains License key after getting top score!

### Announcing the frontend.mu conference

The cat is out of the bag. We are working hard to make our first frontend.mu conference happen, and now you know ! It will happen on the 30th and 31st August 2024 at Middlesex University. We have 10 slots for sponsors, so if you would like to help us and be part of this, reach out ASAP !

![frontendmu-conference.png](/content/images/2024/03/frontendmu-conference.png)

### Streamlit

Karasarajen was next up. He reached out to me at the November meetup saying he would like to present something for the upcoming meetup. It's encouraging to see young developers take the leap and go in front of an audience. There were some technical difficulties with the HDMI cable, so we just mirrored his screen on another device over a video call screen share and that stabilized things.

![kasarajen-streamlit-presentation-feb-2024.png](/content/images/2024/03/kasarajen-streamlit-presentation-feb-2024.png)

He shared his experience building things with Streamlit, a python full-stack framework that lets you deliver customized web applications very fast. It was interesting seeing alternatives to the big names like Django and flask.

There were other streamlit devs in the audience, namely Gael, who built this open-source project about electoral data using streamlit.

### import 'htmx.org'

Mike entered the floor to speak about HTMX (with go). He did a summary of how the landscape of web development has evolved and how these days it's filled with a lot of build tools, state management libs, client side rendering, and SPAs. He proposed a different way of building web applications, namely using HTMX. His presentation style, as usual, was very captivating and he engaged the audience fully.

![mike-giovanni-jules-htmx-presentation.png](/content/images/2024/03/mike-giovanni-jules-htmx-presentation.png)

There were a few questions at the end, and he demoed a simple todo-application as well as a more complex chat application communicating in real-time. With nearly no JavaScript.

### Frontend News & Updates

It was my turn to update everyone on the latest and hottest news in web dev, as a lot has happened during the past few days. I spoke about the following:

- jQuery 4
- React19
- KDE 6
- Apple PWA News
- Google Gemini
- OpenAI Sora
- go 1.22
- sonnet write

The goal was to inform people about the changes that are happening, and get them curious so that they can look into it more on their own time.

![sandeep-ramgolam-meetup-2024-zed.png](/content/images/2024/03/sandeep-ramgolam-meetup-2024-zed.png)

### In conclusion

Yet another awesome meetup, good vibes all around. Met a few new faces and learned a lot of new things ! frontend.mu conference is now official ! Get in touch with me or kushul if you want to sponsor the event.

### Interested to host a meetup next year?

If you want to host a frontend.mu meetup next year, get in touch with me or Kushul. Until then, see you !
