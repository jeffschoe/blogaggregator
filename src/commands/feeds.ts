//commands/addfeed.ts
import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { getUserById } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { printFeedFollow } from "./feed-follows";
import { printGatorLineBreak } from "src/lib/db/queries/utils";


export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length !== 2) {
      throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    } 

    const [feedName, url] = args;

    const feed = await createFeed(feedName, url, user.id);
    if (!feed) {
        throw new Error("Failed to create feed");
    }

    const feedFollow = await createFeedFollow(user.id, feed.id);

    printFeedFollow(user.name, feedFollow.feedName);

    console.log("Feed created successfully:");
    printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* Name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
  printGatorLineBreak();
}

export async function handlerListFeeds(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 0) {
      throw new Error(`usage: ${cmdName}\nno additional args allowed`);
    } 

    const feeds = await getFeeds();

    if (feeds.length === 0) {
      console.log(`No feeds found.`);
      return;
    }

    console.log(`Found ${feeds.length} feeds:\n`);

    for (let feed of feeds) {
      const user = await getUserById(feed.userId);
      if (!user) {
        throw new Error(`Failed to find user for feed ${feed.id}`);
      }

      printFeed(feed, user);
      console.log(`=====================================`);
    }
    
}

