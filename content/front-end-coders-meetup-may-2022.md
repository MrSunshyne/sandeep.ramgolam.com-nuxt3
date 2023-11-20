---
id: 6289d539af837023bc980a3d
uuid: e079a24a-e8a3-41b5-8e4e-d8e5bfee5115
title: Front-end Coders Meetup - May 2022
slug: front-end-coders-meetup-may-2022
comment_id: 6289d539af837023bc980a3d
feature_image: /content/images/2022/05/may-2022.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2022-05-22 06:16:25
updated_at: 2022-05-22 09:38:20
published_at: 2022-05-22 06:31:00
custom_excerpt: This meetup was around REACT and there were presentations about
  react keys, memoization, hosting SPAs and ViteJS
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

Two in a row! We have a streak going on now as far as organizing front-end meetups go. This time we were welcomed by Le Wagon - Mauritius. Many thanks to Zakiya B from FINAM who helped me get in touch with Basile M in order to secure this location.

After spending the previous night working on my two presentations, [powered by sli.dev](https://sli.dev/), I was greeted with a nice rainbow morning view on Saturday 21st of May at home.

![](/content/images/2022/05/image-1.png)

Morning of May 21st

I reached there around 9.30AM and met with Billy who was representing Le Wagon. He was very helpful and accompanied us throughout the meetup. Once the projector was setup, we waited a few more minutes for attendees to reach then kick off the meetup.

# Welcome Note

Everyone was seated and ready to go, and to start things I made a quick intro about what/who/why of the Front-end Coders made a few announcements and introduced our speakers for the day.

1.  Our meetup.com subscription is cancelled.
2.  We have new website, and hopefully a proper domain soon : [https://front-end-coders-mauritius.netlify.app/](https://front-end-coders-mauritius.netlify.app/)
3.  We aim at continuing regular in-person meetups! Next topic : UX in June
4.  We have a discord! [https://discord.gg/WxXW9Jvv6k](https://discord.gg/WxXW9Jvv6k)

## Topic 1: Keys in React - Saamiyah Peerun

![](/content/images/2022/05/image-3.png)

She spoke about Keys in react, and how their use case go far beyond rendering lists. There were very interesting demos and explanations around some common bugs that could occur when keys are misused. I thought this was very insightful and most of the recommended patterns in this session also apply to other frameworks such as VueJS.

[Saamiyah](https://twitter.com/smearthelove) also spoke about how react works internally so that some of the re-rendering behaviors made more sense.

## Topic 2: Memoisation in React - Zeeshaan Maudarbocus

![](/content/images/2022/05/image-5.png)

Zeeshaan Maudarbocus - Demoing Memoisation in REACT

I met [Zeeshaan](https://www.linkedin.com/in/zeeshaan-maudarbocus/) during a Code & Coffee session some months ago where he expressed his fondness of react. When the react meetup was set in motion, i contacted him for a potential talk and he was very positive about doing it! This session was very lively, and we got to know more about specific scenarios regarding memoisation in react, i.e when does something re-render, when can we avoid unnecessary re-renders and why is that important.

To  me, Memoisation appeared to be techniques of Memory Optimization, now i'm wondering if the former word is a mashup of the latter. Zeeshaan mentioned that any app should work the same without these techniques and only apply them at a later stage.

One of the slides read as follows :

> Make it Work  
> Make it Right  
> Make it Fast

## Topic 3 : Hosting SPAs - Ish Sookun

One of our speakers had a personal issue and couldn't attend. We wish him a speedy recovery. He informed me a few days before the meetup and [Ish](https://twitter.com/IshSookun) was kind enough to do a presentation on short notice.

![](/content/images/2022/05/image-8.png)

Ish Sookin - demonstrating NGINX configuration for SPAs

Ish explained how to host an SPA using [NGINX](https://nginx.org/) configuration. This was the first time I actually understood how that conf file works and now it all makes sense.

Hosting SPAs are slightly different from normal server-rendered applications since the routing should be delegated to the browser and not the web server. In this case the web server only needs to redirect to the `index.html` page and leave the rest to the browser.

There were a few questions about tweaking the NGINX conf and also about how to handle errors and status codes with this configuration as it appeared everything would always return status 200. Some of the solutions was to hard redirect to a predefined 404 page.

## Lunch

After 3 presentations lunch arrived ! Le Wagon made arrangements to get pizza's from Yo L'artisan, which coincidentally is one of my favorite pizza places!

![](/content/images/2022/05/image-6.png)

Lunch time!

We had a 30 minutes break for lunch and networking. I spoke to a few people, some who had just participated in the recent WebCup and some who attended the front-end coders meetup for the first time. The atmosphere was buzzing with lots of tech talks, which was very nice to see. That's the real goal of meetups ;)

![](/content/images/2022/05/image-10.png)

## Topic 4 : ViteJS - Sandeep Ramgolam

I clearly wasn't having a great hair-day. :|

I presented the last topic of the day, which was ViteJS and shared my experience of working with it. We had to go down memory lane, explaining how the web works, how bundlers came into existence and why they seemed to be no longer needed.

![](/content/images/2022/05/image-12.png)

Sandeep Ramgolam - Speaking on ViteJS 

[Vite](https://vitejs.dev/) enabled amazingly fast developer experience and I proceeded to do live demo's of starter React projects where one of them used Vite and the other one used [Create-React-App](https://reactjs.org/docs/create-a-new-react-app.html)([webpack](https://webpack.js.org/)).

Vite can also be used without any framework, and just as a dev web server.

Many people had not heard of Vite before and it was quite nice to demonstrate how fast it is, and how it achieves that kind of speed.

I should probably work a little more on my slides for next time as it was very bare bone and not too visual.

## Recording or Video of the session.

We had some logistics to record the session on a laptop along with microphones and a backup audio, however that'll require some more time to get online. The video might have frozen at the start, so no promises on that one. Sorry !

## Conclusion

While packing up we were discussing continuing the networking sessions and I spoke to a few more new faces. This meetup was really nice and we're looking forward the next one ! Unfortunately I forgot to ask everyone for a group photo during lunch, so we did that after the meetup, but some people had already left by then.

Special thought for our friend Joshua who managed to make it to the parking of LeWagon but then had to go back. Next time !

![](/content/images/2022/05/image-14.png)

Front-end Coders Meetup - Group Photo (MASKS ON)

As usual the date and location will be announced on [facebook](https://www.facebook.com/groups/1667468833491833)/[linkedin](https://www.linkedin.com/in/sandeepramgolam/) and on the [website](https://front-end-coders-mauritius.netlify.app/). Stay tuned!