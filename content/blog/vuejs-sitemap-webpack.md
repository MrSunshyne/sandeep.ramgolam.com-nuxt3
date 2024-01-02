---
title: Generate a sitemap.xml for VueJS app
slug: vuejs-sitemap-webpack
feature_image: /content/images/2020/04/generate-sitemap-vue-webpack.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2020-04-03T11:43:32.000Z
updated_at: 2020-04-03T12:09:07.000Z
published_at: 2020-04-03T11:54:57.000Z
custom_excerpt: >-
  Front-end Framworks do not give you a sitemap.xml by default. It is possible
  to generate one using a webpack plugin
---

Front-end frameworks are awesome to work with, however they suck at SEO. Google [claims that it executes JS](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html) and will render your page, but too many times I have seen websites built with front-end frameworks get completely ignored if you don't setup Google Search Console.

You might want to the Nuxt route by default to resolve this issue, however you could settle for  a middle ground solution and generate a simple `sitemap.xml`  file that ships with your front-end app.

Nuxt makes is super easy to generate sitemaps using [this plugin](https://www.npmjs.com/package/@nuxtjs/sitemap). In my quest to find out if it's possible to automate this task in a VueJS app, i stumbled across a [reply by LinusBorg](https://forum.vuejs.org/t/ssr-generate-sitemap-xml/42401/2) on the VueJS forums.

He suggested using a Webpack plugin. This sounds perfect as it would only generate the sitemap file on build using a bunch of configs. So let's dive into it.

**Install the webpack plugin as a dev dependency**

    npm install sitemap-webpack-plugin --save-dev

Webpack configurations live inside the `vue.config.js` file, so you want it to look something like this:

**Adjust vue.config.js**

    const SitemapPlugin = require('sitemap-webpack-plugin').default;
    const paths = [
        {
            path: '/',
            lastmod: new Date().toISOString().slice(0,10),
            priority: '0.8',
            changefreq: 'hourly'
        },
    ];
    
    module.exports = {
        configureWebpack: {
            plugins: [
                new SitemapPlugin('https://mywebsite.com', paths, {
                    filename: 'sitemap.xml',
                    lastmod: true,
                    changefreq: 'hourly',
                    priority: '0.8'
                })
            ]
        }
    }

Sitemap configuration in vue.config.js

Notice the `lastmod` key being set to the new date javascript expression. This will make sure the last modified date is set to the build time and in the correct format. You can set it as a static string if that's what you want.

You're good to go!

I've implemented this in the [Covid19 Mauritius](https://covid19.ramgolam.com) page yesterday. You can see [the commit here](https://github.com/MrSunshyne/covid19-mauritius/commit/3411a4bf2fd758373ea245d6e334083432c5f70b):

## Improvements?

It should be possible to derive all the paths automatically using the Vue Router object. I'll leave that for a later blog post.