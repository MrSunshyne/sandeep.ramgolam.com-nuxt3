---
title: How to build a Design System
slug: design-system
feature_image: /content/images/2020/01/design-system.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2020-01-02T09:17:13.000Z
updated_at: 2020-01-02T10:02:54.000Z
published_at: 2020-01-02T10:00:26.000Z
custom_excerpt: Steps to build your own design system based on my experience.
---

Design system is not just a buzz word. I found that it was a well defined method that helps engineering teams when building medium to large size projects. In this article I share my experience in building a design system and what are the steps you may follow to get it right.

This post is a summary of a talk I gave at the [Mauritius Front-end Coders June Meetup](https://www.meetup.com/frontendcodersmauritius/events/261929807/)

**Summary :**

*   Draw Ideas
*   Pick a UI Design software
*   Define Pages, Components, Molecules and Atoms
*   Go backwards
*   Slow start, fast forever
*   How to integrate with TailwindCSS

## Draw Ideas

This might be cliché, however the best way to start is to sketch, with pen and paper a bunch of rough layouts for your pages. The don't need to be pretty, but i found it's the fastest way to get a clear idea in your head, of where to go.

## Pick a UI Design software

After you have a couple of sketches/ideas, it's time to digitize them. My first choice is Figma because it's **free** and **cross platform**. You may also consider Adobe XD or Sketch, depending on your environment.

## Understanding a design system

Any website/app will consist of multiple pages/views and each of those views have many components, and each of these components have smaller components which ultimately boils down to text, shapes and images.

**Let's recap:**

*   Pages are made up of Components
*   Components are made up of Molecules
*   Molecules are made up of Atoms
*   Atoms are the smallest pieces in the system

With that in mind, the whole point of the design system is to minimize the number of Atoms and Molecules in an attempt to intentionally impose limits on the design. These limits do not block creativity, but rather they bring coherence and cleanliness and maintainability to both, how the system looks and how the system is implemented.

Note that we aim to minimize atoms and molecules, however we don't set any limits to Components and Pages. You should feel free to experiment with any combinations and permutations of molecules to come up with new components for the design system.

## Go backwards

With a clean idea of the building blocks you're now empowered to build your own design system, however only a madman would be able to imagine all the molecules and atoms required to build a design system before building any components. So my advice here is to proceed backwards.

1.  Start by building a component
2.  Once you are happy with how it looks, break it apart and form molecules with it  
    Literally copy paste the elements around.
3.  Do the same to the molecules to create atoms.
4.  Build the next component and reuse the atoms or molecules that you have from the previous component.
5.  After 5-6 components you'll have enough atoms and molecules to build any other component and you'll find that you don't need to create many more.

## Slow start, fast forever

> At this point you have the freedom to create unlimited amount of components while remaining within a framework that will automatically adhere to the root ideas of your design.

## How to integrate with TailwindCSS

Given how you will be able to limit the number of atoms, by definition you have all the basic building blocks of the entire design already laid out for you in one place.

You may choose to build a 'base' css file with all the atoms definition. This is where you define all the colors, fonts, font-sizes used in the design. If you're using a utility-first framework such as TailwindCSS, you might want to dive right into your `tailwind.config.js` and customize it to your exact needs.

The implementation process becomes amazingly pain-free with this approach. Your front-end developer will thank you.