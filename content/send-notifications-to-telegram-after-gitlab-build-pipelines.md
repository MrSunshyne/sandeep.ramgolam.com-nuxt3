---
id: 5dda319c0fc4877c65e365b2
uuid: d0788548-399d-4949-9797-f90482be09bb
title: Send notifications to Telegram after GitLab build pipelines
slug: send-notifications-to-telegram-after-gitlab-build-pipelines
comment_id: 5dda319c0fc4877c65e365b2
feature_image: __GHOST_URL__/content/images/2019/11/gitlab-telegram-notifications.jpg
featured: 1
type: post
status: published
locale: null
visibility: public
created_at: 2019-11-24 07:30:36
updated_at: 2023-05-03 15:03:19
published_at: 2019-11-24 08:04:27
custom_excerpt: |
  Using a telegram bot to send notifications from Gitlab.com to telegram
codeinjection_head: null
codeinjection_foot: null
custom_template: null
canonical_url: null
email_recipient_filter: all
newsletter_id: null
lexical: null
show_title_and_feature_image: 1

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

![](__GHOST_URL__/content/images/2019/11/Screenshot-2019-11-24-at-11.46.56.jpg)

2\. Start the configuration process by clicking on the button at the bottom. (In the screenshot it says 'restart' because I did the process twice, to get the screenshots)

![](__GHOST_URL__/content/images/2019/11/Screenshot-2019-11-24-at-11.48.02.jpg)

3\. Copy the url provided by the bot and navigate to your gitlab repository.

Proceed to Integrations > Add Webhook > paste the url there.

![](__GHOST_URL__/content/images/2019/11/Screenshot-2019-11-24-at-11.48.54.jpg)

Be sure to enable all the options you want to receive notifications for. In my case, I only really care about CI Jobs completion and not really about pushes.

4\. You're good to go !

![](__GHOST_URL__/content/images/2019/11/Screenshot-2019-11-24-at-11.49.37.jpg)

## The Hard Way :

You don't really want to do all of [this](https://core.telegram.org/bots/webhooks).