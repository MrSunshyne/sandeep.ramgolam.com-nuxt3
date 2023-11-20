---
id: 5de4fe51352930856b0432d9
uuid: cf88dc23-1db8-48bf-a8ea-fb94bedc57e1
title: Build a static website with Ghost API, Nuxt & Gitlab (FIRST DRAF)
slug: build-a-static-website-using-ghost-nuxt
comment_id: 5de4fe51352930856b0432d9
feature_image: __GHOST_URL__/content/images/2019/12/pre-rendered-and-spa-1.jpg
featured: 0
type: post
status: draft
locale: null
visibility: public
created_at: 2019-12-02 12:06:41
updated_at: 2023-05-03 15:03:14
published_at: 2019-12-02 13:35:13
custom_excerpt: null
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

## Preface

You've probably heard of Static Websites. After the craze of SPAs, part of the dev world wanted to regain some sanity and they went back full circle, to building websites the way browsers were meant to read them, static html. However it wasn't all for nothing as these brave developers were now armed with knowledge and experience harnessed through their hardships battling with SPAs. Some are the most common issues are listed as follows, including but not limited to:

*   Dependency on frameworks at runtime
*   Search Engine Optimization
*   loading.... (staring at spinners)

## Wishlist :

1.  Use Nuxt/VueJS to build the front-end.
2.  The API(Ghost Headless) should only run on my local machine.
3.  All pages should be populated and rendered locally.
4.  All image variants need to be generated locally.
5.  The ghost backend should be accessible on all my computers.
6.  The website should be hostable(is that a word?) on Gitlab Pages.
7.  Deploy/Publishing should be done via git & Gitlab Pipelines.
8.  **Everything** should to be version controlled.

## Benefits :

*   Domain Cost: $0
*   Web Server Cost: $0 (true serverless)
*   SEO Works
*   Heavy pages don't exist(the heavy lifting is done at compile time)
*   I can leverage my experience in VueJS to organize the website.

## 1\. Use Nuxt/VueJS to build the front-end.

Nuxt.js, a framework built on top of VueJS, sought to bring back some of the glory of static website by pre-rendering pages and serving HTML pages that existed on disk whenever a request would occur. However this wouldn't behave like a full static website. After the first page loads, the page is 'hydrated' and any subsequent navigation is handled by the framework, on the client side. This means, if the next page requires an API call, that API call would occur and the navigation would happen without any page reload! They called it 'universal' as it combines best of both worlds, i.e SPA & Pre-rendered Website

![The flow when navigating a pre-render + spa website](__GHOST_URL__/content/images/2019/12/pre-rendered-and-spa.jpg)

The flow when navigating a pre-render + spa website

This architecture solves most problems that SPA encounters by making it behave like a pre-rendered page when it matters, however it still needs a server running somewhere for the next pages to load correctly, even though these pages have been pre-rendered and are sitting on the web server. This is the behaviour that I didn't want on my website for one main reason : the API needs to remain publicly accessible on the internet.

xxxx

## **Drawbacks :**

*   Takes time and energy to setup
*   Deploy takes 30 seconds
*   You gotta frankenstein some things (image generation)