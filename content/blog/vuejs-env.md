---
title: Environment Variables in VueJS
slug: vuejs-env
feature_image: /content/images/2020/01/vuejs-environment-variables.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2020-01-08T07:15:51.000Z
updated_at: 2020-01-08T11:43:12.000Z
published_at: 2020-01-08T10:37:51.000Z
custom_excerpt: >-
  Use Vue CLI to automatically load your environment variables without the need
  to install any additional plugins.
---

Environment variables, or `.env` files are generally used to store environment specific information, i.e Production, Staging, Pre-prod, dev, local etc.

They **aren't** usually pushed to your git repo or shared.

The most common use case i've seen is using them to store API access token for services such as [Mapbox](https://www.mapbox.com/) or [Google Maps API](https://developers.google.com/maps/documentation) etc..

If you're building a VueJS app you may choose to store your tokens in an env file and Vue CLI will automatically load your environment variables without the need to install any additional plugins.

## Environments

You may create one of the following files :

`.env` - available in all environments

`.env.development.local` - available in development

`.env.production.local` - available in production

The name of your variables **Must Start** with VUE\_APP\_<VARIABLE\_NAME>

## Usage

    VUE_APP_ACCESS_TOKEN="lsis8ssx82729jnajoiaj3"

    export default {
    	data() {
        	return {
            	accessToken : process.env.VUE_APP_ACCESS_TOKEN
            }
        }
    }

## What happens when you have the same variable in two env files?

I tested this scenario by creating the same environment variable in `.env` and `.env.development.local`.

It turns out the value that appears in `.env.development.local` override the other one.