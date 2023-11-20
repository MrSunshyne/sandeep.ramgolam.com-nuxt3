---
id: 5dd94a680fc4877c65e36588
uuid: 3bfb023f-4c63-4908-a347-98d4d06fcb55
title: How to prevent PurgeCSS from removing certain CSS rules
slug: how-to-prevent-purgecss-from-removing-certain-css-rules
comment_id: 5dd94a680fc4877c65e36588
feature_image: /content/images/2019/11/purge-css-exclude-1.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2019-11-23 15:04:08
updated_at: 2020-01-01 09:28:15
published_at: 2019-11-23 15:14:35
custom_excerpt: "You may run into edge cases when using PurgeCSS where you might
  really want to keep some css in the final build files. "
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

You may run into edge cases when using PurgeCSS where you might really want to keep some css in the final build files. These can be for various reasons :

*   These styled will be used after some kind of JS parser has operated, hence it wasn't detected during the build time.
*   You have elements that will load at run time(essentially same as above)
*   You really want people to see that line of CSS in devtools.

The feature and all of it's options are very well documented [here](https://github.com/FullHuman/purgecss-docs/blob/master/whitelisting.md)

The most useful one for me would be :

    /* purgecss start ignore */
    h5 {
      color: pink;
    }
    
    h6 {
      color: lightcoral;
    }
    
    /* purgecss end ignore */

That's it, this bit of CSS will make it to the final build file. These comments will shield the lines of CSS they contain with their life !