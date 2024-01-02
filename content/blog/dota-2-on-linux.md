---
title: Dota 2 on linux
slug: dota-2-on-linux
feature_image: /content/images/2023/02/software-updates-ubuntu-1-1000w.png
featured: 1
type: post
indexable: true
status: published
visibility: public
custom_excerpt: >-
  I read numerous articles about people running Dota 2 successfully on Linux,
  and it was the moment to try it myself.
date: 2019-11-16T06:17:57.000Z
---

I’ve been using Ubuntu a lot since I got my Fibre internet connection installed a last year. I still had to get back to Windows just for gaming. I read numerous articles about people running Dota 2 successfully on Linux, and it was the moment to try it myself.

## TLDR;

> Download Steam, download Dota, play dota.

## Graphics Card

First thing, switch to the proprietary nvidia driver by going in Settings > Additional Drivers > Proprietary Driver

## Installation of the thing

The first step is to get the steam client installed.

sudo apt-get install steam

Once that step is completed, login Steam and install Dota 2 from the Library. After you’ve download the 13gb of files, you should see the Launch button instead of the Install button.

## Gameplay

Upon launching the game I noticed that it would default to Borderless Window mode in the Video Settings. I immediately changed that to Fullscreen for a more immersive experience.

At times, hitting the Windows/Super button would minimize the game, fortunately I have a gaming mode on my keyboard to disable that key. If you do not have that option, I’m sure there’s a way on linux to remap a key :D

## Performance

### Frame per Second

I get 120fps in-game, the same number that I get when I run Dota 2 on Windows 10.

### Latency

This could be a blog post in itself, but coming straight to the point, right now i’m getting an average of 65ms in-game, and 80ms in the ping checker utility, which is the same I get on Windows 10.

I play on South African valve servers as I get 200ms+ latency to EU and 350ms+ latency on other regions.

![](/content/images/2019/11/latency-map-dota2-1.jpg)

## Dota 2 with Vulkan

There are reports that confirm switching to Vulkan improves performance, but since i’m already getting way more than my monitor(60fps) can handle, it wouldn’t be too helpful except during intense team fights where FPS can drop to 40/s.

To activate Vulkan, tick the DLC in steam as show below. This will initiate the 350mb file download and install Vulkan. When that is done, add -vulkan to the launch options to open Dota 2 with Vulkan.

## Conclusion

Dota 2 runs just fine on Linux :)