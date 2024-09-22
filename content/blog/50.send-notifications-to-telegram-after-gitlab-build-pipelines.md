---
title: Send notifications to Telegram after GitLab build pipelines
slug: send-notifications-to-telegram-after-gitlab-build-pipelines
feature_image: /content/images/2019/11/gitlab-telegram-notifications.jpg
featured: 1
type: post
indexable: true
status: published
visibility: public
custom_excerpt: |
  Using a telegram bot to send notifications from Gitlab.com to telegram
date: 2019-11-24T07:30:36.000Z
---

After a little digging online about sending a notifications from Gitlab.com to your telegram account, I found this required setting up a server and run something that would intercept the webhook from Gitlab and send it to your telegram account. Fortunately the nice people at integram.org already solved the issue by creating a bot for this.

## Why

Whilst being extremely simple, little things like this are cheap ways to improve the overall flow of deployment while reducing the stress and hassle of logging into gitlab.com to check the pipeline status.

Normally system admins and developers would send these kind of notifications to their business messaging application like Mattermost or Slack, however my use case here is to get notified upon successful build and deployment of this personal blog.

## The easy way:

*   Add Telegram Bot
*   Configure Gitlab Webhooks
*   Profit !

1.  Navigate to : [https://telegram.me/gitlab\_bot](https://telegram.me/gitlab_bot)

![](/content/images/2019/11/Screenshot-2019-11-24-at-11.46.56.jpg)

2\. Start the configuration process by clicking on the button at the bottom. (In the screenshot it says 'restart' because I did the process twice, to get the screenshots)

![](/content/images/2019/11/Screenshot-2019-11-24-at-11.48.02.jpg)

3\. Copy the url provided by the bot and navigate to your gitlab repository.

Proceed to Integrations > Add Webhook > paste the url there.

![](/content/images/2019/11/Screenshot-2019-11-24-at-11.48.54.jpg)

Be sure to enable all the options you want to receive notifications for. In my case, I only really care about CI Jobs completion and not really about pushes.

4\. You're good to go !

![](/content/images/2019/11/Screenshot-2019-11-24-at-11.49.37.jpg)

## The Hard Way :

You don't really want to do all of [this](https://core.telegram.org/bots/webhooks).