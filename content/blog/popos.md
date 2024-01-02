---
title: Pop!_OS! 20.04 - My First Impressions
slug: popos
feature_image: /content/images/2020/05/pop_os.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
custom_excerpt: I installed Pop!_OS and I liked it
date: 2020-05-03T12:57:33.000Z
---

## Obtain the ISO

A fairly painless process of just downloading it from [their official website](https://pop.system76.com/). They offer two versions with the graphics drivers pre-installed. Yes Please ! I grabbed the nvidia version and createdt an ISO using [ROSA Image writer.](http://en.rosalinux.com/downloads/) It was done in a couple of minutes.

![](/content/images/2020/05/pop-download.png)

After booting from the USB I was greeted with a very bright looking desktop. Perhaps a little too bright for my taste. I wasn't sure how I was going to do the partitioning yet so I was pleased to see the partitioning tool that comes with the installer reveal itself at first steps.

After creating 2 partitions, one for `root` and one for `home`, the tool actually recognized them automatically  in the "use as" section of the tooltip and that little touch immediately made me feel more confident during the install process.

![](/content/images/2020/05/Screenshot-from-2020-05-02-10-45-25.png)

Notice the ticks next to the partition selection. That's attention to detail. Well done system76 people!

The rest of the process was so fast that I wasn't sure if it was over when it was.

![](/content/images/2020/05/popos-installation.png)

Sleek installation process

![](/content/images/2020/05/pop-os-installation-details.png)

The small terminal icon that reveals what's running. Love it! 

![](/content/images/2020/05/popos-installation-complete.png)

After a few minutes it was done that's was painless. Truely

After the reboot I was greeted with a super smooth GNOME desktop. It's hard to describe but it felt really really smooth. The kind that makes you instantly say "this feels good".

## Migrating my applications.

Before destroying my KDE, i kept a list of all applications I installed using `sudo dpkg -i` in this gist

![](/content/images/2020/05/gist-linux-programs.png)

Then I simply used a text editor to concat all the program names and install them in one go as such :

`sudo apt install code darktable docker .....zsh`

That took 5 minutes and everything was installed correctly :D

## Pop Shop

This is their app store and it looked good enough compared to atrocities I've seen elsewhere(looking at you elementary os).

![](/content/images/2020/05/pop-shop.png)

It asked me if I wanted Steam so I installed that and restored my game library in a few minutes. That worked painlessly as well.

## Auto Tiling

This was the one feature that convinced me to move. I was happy to find a DE taking this seriously and putting it right inside the defaults.

![](/content/images/2020/05/auto-tiling.png)

Auto Tiling Pop OS 

It works as expected, but more importantly I can toggle it off whenever I want. This way I actually have best of both worlds(floating and tiling).

![](/content/images/2020/05/auto-tiling-options.png)

Auto Tiling Settings

## Gaming

I noticed my games were running smoother than they were under KDE Neon. I'm not sure why because I'm using the same drivers. I'm just happy it's so much smoother. I was disconnected from a few games under KDE Neon because my desktop would refuse to render the game somehow.

![](/content/images/2020/05/dota-2-linux.png)

## Conclusion

This will now be my daily driver, gaming machine and workstation.