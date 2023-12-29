---
id: 5e84cbc7fb739d54dab92209
uuid: da752bf8-60f9-425f-a8ee-b9b73b65a46d
title: Ghost with Cloudinary as storage adapter
slug: ghost-cloudinary
comment_id: 5e84cbc7fb739d54dab92209
feature_image: /content/images/2020/04/ghost-cloudinary.jpg
featured: 1
type: post
indexable: true
status: published
locale: null
visibility: public
created_at: 2020-04-01 17:13:43
updated_at: 2020-06-30 16:41:57
published_at: 2020-04-01 17:38:00
custom_excerpt: Ghost lets you completely swap out this image processing feature
  an offload it to an image processing cloud service.
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

You've probably heard about Ghost, the amazing free and open source blogging CMS. One cool thing about it is how easy it is to integrate with other services.

Ghost lets you completely swap out this image processing feature and offload it somewhere else, like cloudinary, which is an image processing cloud service.

## Why change storage adapter?

You must be thinking why would you do this if ghost can already process your images? There can be several reasons.

1.  When you have very complex image processing needs, perhaps watermarking ?
2.  When you don't want your images to be stored where ghost is running.

## How?

1.  Create a [cloudinary](https://cloudinary.com/) account, and confirm your email address.
2.  Install the [`ghost-storage-cloudinary`](https://github.com/eexit/ghost-storage-cloudinary) adapter (see instructions below)
3.  Change your ghost configurations to use cloudinary. (see instructions below)
4.  You're all set !

## Installation

Go to the root of your Ghost installation and run these

    npm install ghost-storage-cloudinary@2 
    mv node_modules/ghost-storage-cloudinary versions/3.x.x/core/server/adapters/storage

## Change ghost configurations to use adapter

At the root of your ghost installation you will find your configuration file, usually `config.development.json` or `config.production.json`

Add a `storage` and `imageOptimization` key as follows:

    "storage": {
        "active": "ghost-storage-cloudinary",
        "ghost-storage-cloudinary": {
          "useDatedFolder": false,
          "auth": {
            "cloud_name": "<INSERT_CLOUDNAME>",
            "api_key": "<INSERT_APIKEY>",
            "api_secret": "<INSERT_APISECRET>"
          },
          "upload": {
            "use_filename": true,
            "unique_filename": false,
            "overwrite": false,
            "folder": "blog-images",
            "tags": [
              "blog"
            ]
          },
          "fetch": {
            "quality": "auto",
            "secure": false,
            "cdn_subdomain": true
          }
        }
      },
      "imageOptimization": {
        "resize": false
      }

The storage key takes care of telling ghost to send all images to cloudinary.

Don't forget to fill out the `auth` fragment with details from your cloudinary account. You will find the cloudname, api\_key, and api\_secret in your cloudinary dashboard.

The imageOptimization key tells ghost to stop doing image optimizations.

## Is it free?

Cloudinary offers 25 credits per month. Each credit is 1000 transformations, which appears to be more than enough for a personal blog. I'm not sure if the bandwidth can be reduced even more by putting cloudflare in front. I guess we'll find out.

## Perfect for Static Websites?

I made a [NuxtJS theme called `boo`](https://boo.ramgolam.com/) for Ghost Headless CMS. In that scenario, you could run ghost on a local machine, and not have to pay any server for hosting at all. But your images wouldn't be accessible online.

It appears cloudinary as storage adapter completely resolves this issue ! Perhaps there are some caveats I overlooked? What are your thoughts?