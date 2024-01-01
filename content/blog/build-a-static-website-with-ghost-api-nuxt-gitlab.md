---
id: 5e0726570b8a5707aaf98a4e
uuid: e80c792d-fac3-4d47-bedf-2658df438b73
title: Build a static website with Ghost API, NuxtJS & Gitlab(SECOND DRAFT)
slug: build-a-static-website-with-ghost-api-nuxt-gitlab
comment_id: 5e0726570b8a5707aaf98a4e
feature_image: null
featured: 0
type: post
indexable: true
status: draft
locale: null
visibility: public
created_at: 2019-12-28 09:54:31
updated_at: 2020-04-03 11:42:17
published_at: null
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

There are many ways to build websites. Each of them have their own pros and cons. One of them is static website. In this article I am going to describe how I built a static website while also overcoming some disadvantages of the latter by using little tricks.

Two types of static website:

1.  The pages are rendered at compile time, however all API calls are still done at runtime by the browser. (e.g Nuxt, Gatsby)
2.  Everything is bundled at compile time, including API calls. No APIs required at runtime in the browser e.g (Hugo, Plain HTML)

_Note : API Calls are usually to a Headless CMS to retrieve content_

I chose to use Nuxt because of how much I love & am familiar with VueJS, but I need to it behave more like Hugo, in the sense that once I  compile the static website, I want to be able to shut down the headless cms, in my case: Ghost. This would offer some advantages.

## Benefits

1.  I can run Ghost locally, hence saving me the cost of renting a VPS.
2.  All the firepower of my local machine is available for use.  
    (instead of a measly VPS with 1GB ram)
3.  Enjoy using the Ghost Editor in all its glory
4.  Use the simple and intuitive Ghost CMS to manage content, tagging and metadata
5.  Customize the front-end theme with 100% flexibility.
6.  Possibility to add completely custom pages as part of the Nuxt site. These are pages that I wouldn't want Ghost to handle such as data visualization projects, fancy "about me" pages etc..
7.  Ability to host the entire website on Gitlab Pages for free, plus a free domain.
8.  Easy deployment using Git & gitlab pipelines.  
    Which also means everything is versioned and reversible.
9.  I can run this "system" on multiple machines because both the Ghost API and the Nuxt site have a git repo and the entire system is file-based. Yes, I commit the db file from ghost to git. Don't judge me.
10.  Did I mention all of the above require $0 investment ?

## Drawbacks

1.  Image management isn't straight forwards.  
    Should you want to generate multiple version of the same image for practical purposes such as using different images at different breakpoints, generate thumbnails etc.  
    Ghost could be better at this, for now we'll use a different technique to get around this limitation.
2.  Updates are not real time. They take around 2-3minutes.
3.  Honestly it takes a time and energy to setup.

Let's get started then? here's the recipe if you want the overview. We'll elaborate on each of them in the sections below. Feel free to skip the parts that you're already familiar with.

### Setup

1.  Install & Setup Ghost locally and version it through a git repo.
2.  Install NuxtJS and version it through another git repo.
3.  Add the "Content API" library to connect Ghost & Nuxt
4.  Create a listing page for all post
5.  Create a post full view page

### Customize

1.  Use nuxt static to kill api calls at run time.
2.  Use batch-image-resizer to copy & generate images from ghost for nuxt

### Deploy

1.  Setup gitlab pipelines
2.  Create a simple deploy workflow using npm scripts