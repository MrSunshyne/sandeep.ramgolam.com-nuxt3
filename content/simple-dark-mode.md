---
id: 5e23ea133c11b2c62732f1a7
uuid: 526cf4c1-f57a-41f8-a8a2-f9d0516c1cc3
title: Dark Mode support in browsers
slug: simple-dark-mode
comment_id: 5e23ea133c11b2c62732f1a7
feature_image: __GHOST_URL__/content/images/2020/01/dark-mode.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2020-01-19 05:33:07
updated_at: 2023-05-03 15:03:18
published_at: 2020-01-19 05:45:49
custom_excerpt: Get to know dark mode and a neat little trick
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

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

![](__GHOST_URL__/content/images/2020/01/dark-mode-switch.gif)

Browser comparison when switching OS appearance

## What about prefers-color-scheme?

Should you want to have fine-grained control over your dark theme, you should still be using this media query.

## Want to learn more?

The article on webkit.org provides great insight on how dark mode works and how you can customize it further to suit a client's need. Check out [the article](https://webkit.org/blog/8840/dark-mode-support-in-webkit/) for more info.

## What about browsers on Windows ?

Please let me know!