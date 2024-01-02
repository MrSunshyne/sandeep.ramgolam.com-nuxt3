---
title: Getting Started with Vue 3 Beta
slug: getting-started-vue-3-beta
feature_image: /content/images/2023/02/vue-3-beta-getting-started-1000w.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2020-04-17T15:06:45.000Z
updated_at: 2023-02-15T16:24:19.000Z
published_at: 2020-04-17T15:41:30.000Z
custom_excerpt: >-
  This is a small explanation of how to setup Vue 3 beta with webpack and start
  playing with it 
---

Yesterday Vue 3 Beta was released and it's finally time to start playing with it!

## What does beta mean ?

*   All planned RFCs have been merged.
*   All [merged RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3A3.x) have been implemented.
*   Unlikely that any new features will be added as from now.

## How to try Vue 3 Beta ?

Since the docs are not ready yet, I was a bit confused as to how should I install Vue 3. I am used to the CLI and I can't be bothered to go learn webpack just to setup a local dev environment. Luckily there is a [webpack setup](https://github.com/vuejs/vue-next-webpack-preview) available on the [vue-next repo](https://github.com/vuejs/vue-next) that can help us.

1.  Create a new folder and  install it using [degit](https://sandeep.ramgolam.com/blog/degit) as follows:

    npx degit vuejs/vue-next-webpack-preview

If you take a look at the `package.json` file you will notice the Vue version is set to `v3.0.0-alpha.1`, go ahead and change that to `v3.0.0-beta.1` for vue and `@vue/compiler-sfc`.

It should look something like this :

      "dependencies": {
        "vue": "^v3.0.0-beta.1"
      },

Next run `yarn` to install the dependencies.

You may now execute `npm run dev` to have a development environment up and running !

![](/content/images/2020/04/Screenshot_20200417_192250.png)

## Notes

Please keep in mind that the version numbers used in the article are going to be updated daily, probably, by the vue team. You might want to check the latest version of Vue Next [here](https://github.com/vuejs/vue-next/releases).

As I write this Beta 2 was released :D