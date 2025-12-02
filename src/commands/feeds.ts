//commands/addfeed.ts
import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";



export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 2) {
      throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    } 

    const config = readConfig();
    const user = await getUser(config.currentUserName);
    
    if (!user) {
      throw new Error(`User '${config.currentUserName}' not found`);
    }

    const [feedName, url] = args;

    const feed = await createFeed(feedName, url, user.id);
    if (!feed) {
        throw new Error("Failed to create feed");
    }

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
}

