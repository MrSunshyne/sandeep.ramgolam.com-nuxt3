---
title: Download and convert Youtube videos for FREE using youtube-dl
slug: youtube-download
feature_image: /content/images/2020/01/youtube-download-free.jpg
featured: 0
type: post
indexable: true
status: published
visibility: public
created_at: 2019-12-29T10:22:31.000Z
updated_at: 2020-01-02T08:19:19.000Z
published_at: 2020-01-01T10:14:17.000Z
custom_excerpt: How to download YouTube videos for free
---

Every once in a while people need to download a youtube video for research purposes. Of course you should delete the video after downloading them for research purposes, unless they're youtube videos that you own.

There are plenty of websites out there that come up after a quick search, usually things that look like "youtubetomp3" and so on. There are better tools that exist. The best one that i've been using for years is `youtube-dl`. The software is [free and opensource](https://github.com/ytdl-org/youtube-dl). It's a command line utility that will download any public youtube video and optionally convert them to any media format, research purposes. You should delete the videos after testing the tool.

## Installation

**Linux**

    sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
    sudo chmod a+rx /usr/local/bin/youtube-dl

**macOS**

    brew install youtube-dl
    

**Windows** (sigh)

Download the exe from here : [https://github.com/ytdl-org/youtube-dl](https://github.com/ytdl-org/youtube-dl)

## Usage

    youtube-dl [OPTIONS] URL [INSERT_YOUTUBE_URL]
    

While the options available are in the hundreds, here are some of the most useful ones. Replace the url with the one you want to download before running the command.

### Download & convert to mp3

    youtube-dl -x --audio-format mp3 https://www.youtube.com/watch?v=6Dh-RL__uN4
    

### Download highest quality video & convert to mp4

    youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' https://www.youtube.com/watch?v=6Dh-RL__uN4

### Download an entire playlist and convert to mp3

hint:  just use the playlist url instead of the video url.

    youtube-dl -x --audio-format mp3 https://www.youtube.com/playlist?list=PLYH8WvNV1YEn_iiBMZiZ2aWugQfN1qVfM