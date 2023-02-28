# gh-notifications

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

📬 Lightweight (<3KB) Wrapper around the GitHub Notifications API

## Install

```sh

# Using npm
npm install gh-notifications

# Using yarn
yarn add gh-notifications
```

## Usage

> Warning:
> Usage of _gh-notifications_ requires a valid github api token: [Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-api)

```js
const APITOKEN = "**************";

async function main() {
  // get a GitHubInbox instance and pass the api token to it
  const inbox = new GitHubInbox(APITOKEN);
  // initialize the inbox
  await inbox.initialize();

  // fetch all unread notifications
  const unreadNotifications = await inbox.fetchUnreadNotifications();
  // view src/types.ts for all fields in the notification object
  console.log(unreadNotifications);

  // mark the latest unread notification as read
  await inbox.markAsRead(unreadNotifications[0]?.id);
}

main();
```

## License

Published under MIT - Made with ❤️ by Conner Bachmann

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/gh-notifications/latest.svg
[npm-version-href]: https://npmjs.com/package/gh-notifications
[npm-downloads-src]: https://img.shields.io/npm/dt/gh-notifications.svg
[npm-downloads-href]: https://npmjs.com/package/gh-notifications
[github-actions-ci-src]: https://github.com/intevel/gh-notifications/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/intevel/gh-notifications/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/gh-notifications.svg
[license-href]: https://npmjs.com/package/gh-notifications
