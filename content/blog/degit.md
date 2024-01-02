---
title: Blazing fast bootstrapping with degit
slug: degit
feature_image: /content/images/2020/01/degit-blazing-fast.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2020-01-12T15:55:58.000Z
updated_at: 2023-05-03T15:03:18.000Z
published_at: 2020-01-12T16:31:52.000Z
custom_excerpt: Use degit to reduce repetitive tasks while starting new projects
---

In the front-end world, bootstrapping a project has gone through a lot of iterations. From cloning boilerplates from github, via Yeoman, to create-react-app, vue create, till the beautiful `vue ui`, we've always been improving. Lately I have been working on a lot of small projects, mostly Vue based but

## The Drill

Don't get me wrong, vue create and vue ui are amazing tools. But lately I've had to bootstrap a lot of small projects and I find myself :

1.  deleting the `HelloWorld.vue` file all the time,
2.  remove the `About.vue` file and
3.  then clearing it from the `router.js` file, and then
4.  removing all the files related to `eslint` because it can't stop arguing with prettier in the terminal and I haven't figured out how to make them both shut up.
5.  Then I usually add tailwind css via `vue ui` because I can't remember which one of the tailwind css plugins to installs as there are 3 or 4 of them. It's the one with 1.6k stars.
6.  Add a Header and Footer component
7.  Add some flexbox and container classes to make everything well centered on the screen.
8.  Phew, that's a lot and I haven't even started with writing anything that's relevant to the actual project.

## Introducing degit.

I learned about [degit](https://github.com/Rich-Harris/degit) while going through some the [svelte](https://svelte.dev/) tutorials. The simplicity of this tool created by [Rich Harris](https://twitter.com/Rich_Harris) stuck with me. Note that the tool has nothing to do with Svelte itself.

> The more I grow as a developer the more I value tools that aim for simplicity during usage.

### Usage

    npx degit <username>/<repo>

You don't even have to install the tool thanks to [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner). Of course you must run the unescapable `npm install` yourself, but since there are no manual configurations I can wait another 15 seconds by checking Twitter.

## Create your own boilerplate

I set out to create a [simple boilerplate](https://github.com/MrSunshyne/vue-tailwind-boilerplate) for myself, and aptly named it vue-tailwind-boilerplate, and it literally takes me 20 seconds to get started as all the steps mentioned in "The Drill" are already done in the boilerplate!

Boilerplate : [https://github.com/MrSunshyne/vue-tailwind-boilerplate](https://github.com/MrSunshyne/vue-tailwind-boilerplate)

This is the result:

![](/content/images/2020/01/Screenshot-2020-01-12-at-20.13.10.jpg)

## UPDATE(5 April 2020) : Private repos

I was fiddling around with a private repository so that I can use it as a degit template but the cli was asking for my Github username and pass. So after digging into the degit issues on it's repo, I found [this answer by Rich himself.](https://github.com/Rich-Harris/degit/pull/47#issuecomment-582098995)

Basically add `--mode=git` and use the git url and you're good to go.

Example:

    npx degit git@github.com:MrSunshyne/vue-tailwind-boilerplate.git --mode=git

Let me know if you have use cases for this tool. If you enjoyed this article or learned something new, send it to someone who might be interested.