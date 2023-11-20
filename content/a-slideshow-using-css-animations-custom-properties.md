---
id: 5deb8945cf520498852ee958
uuid: 3d5c3a17-0f28-4b90-ac46-58af66110cdc
title: A slideshow using CSS animations & custom properties
slug: a-slideshow-using-css-animations-custom-properties
comment_id: 5deb8945cf520498852ee958
feature_image: __GHOST_URL__/content/images/2019/12/custom-property-slideshow.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2019-12-07 11:13:09
updated_at: 2023-05-03 15:03:19
published_at: 2019-12-07 11:19:15
custom_excerpt: >+
  In this article I explain a little trick I used to build an image slideshow by
  combining css animation & custom properties.

codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

---

The target is to build a full page background slideshow.

HTML :

     <div class="home-hero">
     	<div class="slideshow"></div>
    </div>

CSS :

    .home-hero {
        height: 100vh;
        width: 100%;
        position: relative;
    }
    
    .slideshow {
        height: 100vh;
        width: 100%;
        background-size: cover;
        background-image: url('/backgrounds/image1.jpg');
    }

We have our full screen background image. Essentially we want multiple images that appear one at a time and loop infinitely. From here we can have several strategies to create a slideshow.

Let's add some [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) to make the code easier to work with using this trick :

    .slideshow {
      --bg1: url("/backgrounds/image1.jpg");
        background-image: var(--bg1);
    }

Let's keep going and define some more css variables, `bg1`\- `bg5` and `current-bg`, which we'll use on the element.

    .slideshow {
      --bg1: url("/backgrounds/image1.jpg");
      --bg2: url("/backgrounds/image2.jpg");
      --bg3: url("/backgrounds/image3.jpg");
      --bg4: url("/backgrounds/image4.jpg");
      --bg5: url("/backgrounds/image5.jpg");
        
      --current-bg: var(--bg1)
      background-image: var(--current-bg);
    }

You've probably guessed it by now, we'll swap the custom property `--current-bg` using css `keyframes` and combined with an `animation` property  that _should_ give us an slide show effect.

     .slideshow {
        animation: changeImage 10s linear infinite;
     }
    
    /* Animate using css custom properties */
    @keyframes changeImage {
      0% {
        --current-bg: var(--bg1);
      }
      20% {
        --current-bg: var(--bg2);
      }
      40% {
        --current-bg: var(--bg3);
      }
      60% {
        --current-bg: var(--bg4);
      }
      80% {
        --current-bg: var(--bg5);
      }
      100% {
        --current-bg: var(--bg1);
      }
    }

And voila ! That gives us a very choppy slideshow where the image just flashes abruptly and starts loading.

## Demo 1

Certainly not something we can use in production. We need to add some kind of transition when the image is changing.

## Let's make it fade

What if we used the `opacity` property to fade-out the entire image before it changes, then fade in the image again. It would a pain to add more keyframes though, so let's visualize the problem:

We want to show the image at the green parts but hide the image at the red parts

![](__GHOST_URL__/content/images/2019/12/animation-css-opacity.jpg)

We could write a simple keyframe animation as such :

    @keyframes fade {
      25% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 1;
      }
    }
    

Combined with the ability of CSS animations to be combined on the same element by separating them with commas, we can have the following :

      .slideshow {
        animation: changeImage 20s linear infinite, fade 4s linear infinite;
      }

## Demo #2

We can further improve the code by adding to custom properties to calculate the duration of our animations as such :

    .slideshow {
      
      --numberOfImages: 5;
      --duration: 20s;
      --fadeDuration: calc(var(--duration) / var(--numberOfImages));
    
        animation: changeImage var(--duration) linear infinite, fade var(--fadeDuration) linear infinite;
      }

We end up with a smooth transition between our images, however there's a blank between every image, we want more. We want our image to fade into the next image, not into white, then into the next image.

## Smoother transition

To achieve that we can duplicate the `.slideshow` element in our html and add append a slide `.slideshow2`. We then add an animation delay, `--delay-duration` to the second slideshow so that the image is still  underneath the first slide show but the timing is delayed enough so that we don't end up with a white transition in between. Note that the delay duration should be half the duration of 1 slide, we use `calc` to help us figure out the value.

        <div class="slideshow"></div>
        <div class="slideshow slideshow2"></div>

![](__GHOST_URL__/content/images/2019/12/animation-css-alternate-1.jpg)

      .slideshow {
       --numberOfImages: 5;
      --duration: 20s;
      --fadeDuration: calc(var(--duration) / var(--numberOfImages));
      --delay-duration: calc(var(--fadeDuration) / 2 )
      
        animation: changeImage var(--duration) linear infinite, fade var(--fadeDuration) linear infinite;
      }
      .slideshow2 {
        animation: 
            changeImage var(--duration) var(--delay-duration) linear infinite, 
            fade var(--fadeDuration) var(--delay-duration) linear infinite;
      }

And now we have a smooth slideshow powered by the CSS features:

*   Custom Properties / CSS Variables
*   animation
*   calc()

## Final Demo

## Images Credits

All images used in the demo were from Unsplash tagged under `Mauritius`

Authors:

*   [Arwin Neil Baichoo](https://unsplash.com/@arwinneil)
*   [John O'Nolan](https://unsplash.com/@johnonolan)
*   [Xavier Coiffic](https://unsplash.com/@xaviercoiffic)

## Bonus: Web Component

After sharing this little trick with [Cedric](https://twitter.com/cedpoilly), he quickly made a web-component out of it.

You may check the web component here :

Source : [`https://github.com/cedpoilly/fec-slideshow`](https://github.com/cedpoilly/fec-slideshow)

Demo : [`https://cedpoilly.github.io/fec-slideshow/`](https://cedpoilly.github.io/fec-slideshow/)