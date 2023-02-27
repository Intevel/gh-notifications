const { GitHubInbox } = require("../dist/index.cjs");

async function test() {
  const inbox = new GitHubInbox("");
  await inbox.initialize();

  console.log(await inbox.fetchUnreadNotifications())
}

test();
