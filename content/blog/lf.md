---
title: lf - A terminal file manager written in Go
slug: lf
feature_image: /content/images/2019/12/lf-go.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
created_at: 2019-12-24T09:47:56.000Z
updated_at: 2020-01-01T09:27:45.000Z
published_at: 2019-12-24T09:53:25.000Z
custom_excerpt: >-
  lf is a terminal file manager. It allows you to navigate your file system and
  dispatch commands all from one place. 
---

lf is a terminal file manager. It allows you to navigate your file system and dispatch commands without leaving the terminal. In most cases it's faster than using 'cd' yet gives you a visual interface closer to the feel of a GUI file manager such as Finder or Dolphin. It was written by [gokcehan](https://github.com/gokcehan)

> `lf` (as in "list files") is a terminal file manager written in Go. It is heavily inspired by ranger with some missing and extra features. Some of the missing features are deliberately omitted since they are better handled by external tools. – [Source](https://github.com/gokcehan/lf)

## Installation

**macOS :**

    brew install lf

**Linux :**

    curl -L https://github.com/gokcehan/lf/releases/download/r13/lf-linux-amd64.tar.gz | tar xzC ~/.local/bin
    

## Usage

It's [tutorial](https://github.com/gokcehan/lf/wiki/Tutorial) it's simple and straight to the point and very easy to understand. It's basically a list of keyboard shortcuts. Below however are the ones I find myself using the most :

**Navigate:**

Arrow Keys : `Up` `Left` `Right` `Down`  

Or Vim Style : `H` `J` `K` `L`  

**Run a command**

To run a command on the current directory and show the output use `%`

This will allow you to type in the command and will show the output unlike `$`. I have a slight complaint about this, such that it only shows the last line of the output. Pretty sure it can be fixed (to be updated)

**File/Folder Manipulation**

`copy` (default keybinding `y`) command copies the current file or selections

`cut` (default keybinding `d`) command cuts the current file or selections

`paste` (default keybinding `p`) command pastes the copied or cut files to the current directory

`clear` (default keybinding `c`) command clears copied or cut files:

It's refreshing not having to type CD 100x per day anymore.  
If that's your thing though, cd away.. ^^

## lfcd

When you quit `lf` using `q` you would expect to land where you navigated to, however you land where you started due to OS level restrictions. To get around this issue, add this function in your `.zshrc` or `.bashrc` file

    lfcd () {
        tmp="$(mktemp)"
        lf -last-dir-path="$tmp" "$@"
        if [ -f "$tmp" ]; then
            dir="$(cat "$tmp")"
            rm -f "$tmp"
            if [ -d "$dir" ]; then
                if [ "$dir" != "$(pwd)" ]; then
                    cd "$dir"
                fi
            fi
        fi
    }

Now instead of using lf you can use lfcd and when you press q you will exit where you navigated to! Absolute joy !