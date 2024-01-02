---
title: What are CSS Variables?
slug: css-variables
feature_image: /content/images/2019/12/css-variables.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2019-12-28T09:51:25.000Z
updated_at: 2023-05-03T15:03:19.000Z
published_at: 2019-12-30T11:07:51.000Z
custom_excerpt: Everything you need to know about CSS Variables.
---

CSS Variables are also commonly known as "CSS Custom Properties". These terms can be used interchangeably. They do what you would expect them to : define variables and be able to refer back to them in your CSS.

They're very powerful compared to what we were used to in front-end land, and can be sometimes abused. Not sure if that's good or bad. But hey, look ma! NO JS!

Here's what you need to know, and more :

## Why?

They're variables. They help you write better code with less repetition and more maintainability.

## How to definine a CSS Variable

Here are 3 examples of custom property definitions. Yes, they're all string/text.

    .container {
        --blue: '#004a8f';
        --size: '10px';
        --shadowLarge: '0 0 10px #000';
    }

## How to use a CSS Variable

The syntax is weird, but there's a good reason for that and some advantages too.

    .container {
        --color: 'red';
        background: var(--color);
    }

It looks like a function call, where the argument is the name of the CSS Variable.

## Scope of CSS Variables

As you may have noticed in the example above, CSS Variables need to be defined within a selector scope.

If you try to use the CSS Variables outside this scope it will not work.

    .container {
        --borderWidth: '2px';
    }
    
    /* Bad. Will NOT work, unless .wrapper is a child of .container */
    .wrapper {
        border: var(--borderWidth) solid black;
    }

You may use the CSS Variables in child elements as they inherit from their parents.

If you need to define _**Global**_ CSS Variables, you may do that using the [`:root` pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/:root):

    :root {
        --myGlobalVariable: '#fff';
    }

Since the ::root element is parent to `html`, the entire DOM is considered it's children.

## CSS Variables can have fallbacks

Plot-twist! They can have multiple parameters, which serve as fallbacks

    .container {
        background: var(--color, blue);
    }       

In the example above the `--color` variable is never defined, hence it will fallback to the 2nd parameter and you have a blue background. The fallback can also be a CSS Variable.

![Screenshot 2023-11-19 at 21.26.34.png](/Screenshot%202023-11-19%20at%2021.26.34.png)

## Inline CSS Variables

It's possible to define the css variable inline, like you would do with any normal css.

    <div style="--color: 'red'" class="container"></div>

    .container {
        color: var(--color);
        border: 1px solid var(--color);
    }

This opens huge possibilities when combined with JS. Let's assume you're using a simple [VueJS](http://vuejs.org/) app to create toggle, you could easily combine them as follows:

    <div :style="'--color: ${themeColor}'" class="container"></div>

This technique delegates all the rendering responsibilities to CSS and lets you fine tune the moving parts with JavaScript. We want this.

## Browser Support

[Use them](https://caniuse.com/#feat=css-variables) if you don't need to support IE11. If you do need to support IE11, you have my sympathy.

![](/content/images/2019/12/Screenshot-2019-12-30-at-15.25.04.jpg)

CSS Variable browser support. Screenshot taken on the 30th December 2019

## BONUS : Houdini API & Custom Properties

This part is brand new and it's ok if you're not ready to dive into Houdini right now. No pressure.

You might have noticed all the custom properties we defined were 'text', i.e they have no Types. With the Houdini API it is possible to register a CSS Custom Property using the `registerProperty` method.

![Screenshot 2023-11-19 at 21.25.07.png](/blog/images/Screenshot%202023-11-19%20at%2021.25.07.png)

The code is very simple and looks like this

    window.CSS.registerProperty({
      name: '--borderColor',
      syntax: '<color>',
      inherits: false,
      initialValue: 'red',
    });

You might wonder, why ? Consider the following example :

    .thing {
      --borderColor: "0 0 10px solid";
      border: 1px solid var(--borderColor);
    }

The value of `--borderColor` will obviously not work because it's not a color and we would end up with no border color.

With the help of the registerProperty however, it would detect that the value is not a valid `<color>` and fallback to the red color as defined in the type definition.

You can learn more by reading the article "[Smarter custom properties with Houdini’s new API](https://web.dev/css-props-and-vals/)" by [Sam Richard](https://twitter.com/snugug)

## Conclusion

I hope this article makes it easier for you to deal with custom properties in the future. As you have seen, it's really simple & powerful.