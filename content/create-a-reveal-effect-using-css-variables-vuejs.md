---
id: 5e05e7ea0b8a5707aaf989d0
uuid: 6b5d7a45-0d1c-4431-8b8d-da4ddb021810
title: Create a reveal effect using CSS Variables & VueJS
slug: create-a-reveal-effect-using-css-variables-vuejs
comment_id: 5e05e7ea0b8a5707aaf989d0
feature_image: /content/images/2019/12/css-reveal-effect.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2019-12-27 11:15:54
updated_at: 2020-01-01 09:27:07
published_at: 2019-12-27 11:51:33
custom_excerpt: A simple reveal effect using custom properties in CSS.
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

If you're using VueJS to print a list of repeating items such as article cards etc.. it may be desirable to add a subtle animation should you with to attract the eyes of the viewer.

Some effect ideas would be :

1.  "Fade In" the items all at once.
2.  "Fade In" the items one after the other
3.  Simplify the code with JS

## Fade in the items all at once

In this example we added a simple 'reveal' keyframe animation and applied it to all the child elements

    <template>
       <Card
            v-for="item in 8"
            :msg="item"
            :key="index"
            class="reveal"
          />
        </div>
    </template>
    
    <style>
    /* Simple Fade Reveal Animation */
    .reveal {
      opacity: 0;
      animation: reveal 1s ease-out 1 forwards;
    }
    
    @keyframes reveal {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    </style>

**Results**

## "Fade In" the items one after the other

To improve the effect with the delayed reveal we will use the property `animation-delay` to offset the reveal effect increasingly for each child

    .reveal {
        --multiplier: 0.5;
    
        &:nth-child(1) {
            animation-delay: calc(1s * var(--multiplier));
        }
        &:nth-child(2) {
            animation-delay: calc(2s * var(--multiplier));
        }
        &:nth-child(3) {
            animation-delay: calc(3s * var(--multiplier));
        }
        &:nth-child(4) {
            animation-delay: calc(4s * var(--multiplier));
        }
        /* and so on*/
    }

**Result**

## Simplify the code with JS

The effect above it pretty cool and can be done entirely in CSS. But it's limited as you have to explicitly define all the child elements and their delays. We can do better right ?

If you're using any front-end framework, VueJS in this case, you may chose to make your life a little bit easier by setting the value of the delay through a custom property as shown below

    <!-- Component.vue -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="repeating-item"
      :style="'--delay:' + index + 's'"
    >
    </div>

Define a custom property --delay

    .repeating-item {
        opacity: 0;
        animation: reveal 0.5s ease-out 1 forwards;
        
        --multiplier: 0.05;
        animation-delay: calc(var(--delay) * var(--multiplier));
    }

Use the custom property in a css calc() function

**Result**