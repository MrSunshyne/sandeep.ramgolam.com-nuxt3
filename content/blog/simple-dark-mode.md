---
title: Dark Mode support in browsers
slug: simple-dark-mode
feature_image: /content/images/2020/01/dark-mode.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
custom_excerpt: Get to know dark mode and a neat little trick
date: 2020-01-19T05:33:07.000Z
---

Since the introduction of macOS Mojave, which brought system-wide dark mode, webkit introduced a way to cascade the styles to the browser.

## Dark mode for free

Everyone and their grand mother knows about the `prefers-color-scheme` media query, but it can be done much faster with just one line of CSS.

    :root {
        color-scheme: light dark;
    }

> Specifying the values `light` and `dark` on the root element lets the engine know both modes are supported by the document. This changes the default text and background colors of the page to match the current system appearance. Also standard form controls, scrollbars, and other named system colors change their look automatically.

Source: [webkit.org](https://webkit.org/blog/8840/dark-mode-support-in-webkit/)

## Does is actually work?

I tested it so you don't have to. For now it only works in safari. Since most browsers(except the mighty Firefox) have switched to webkit under the hood, i'm hopeful that it'll be supported soon.

![](/content/images/2020/01/dark-mode-switch.gif)

Browser comparison when switching OS appearance

## What about prefers-color-scheme?

Should you want to have fine-grained control over your dark theme, you should still be using this media query.

## Want to learn more?

The article on webkit.org provides great insight on how dark mode works and how you can customize it further to suit a client's need. Check out [the article](https://webkit.org/blog/8840/dark-mode-support-in-webkit/) for more info.

## What about browsers on Windows ?

Please let me know!