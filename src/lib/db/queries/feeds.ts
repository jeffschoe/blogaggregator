//feeds.ts
import { db } from "..";
import { feeds, users } from "../schema";
import { firstOrUndefined } from "./utils";
import { eq } from "drizzle-orm";


export async function createFeed(feedName: string, url: string, userId: string) {
    const result = await db
    .insert(feeds)
    .values({
        name: feedName,
        url, 
        userId 
    })
    .returning();

    return firstOrUndefined(result);
}

export async function getFeeds() {
    const result = await db.select()
    .from(feeds);
    
    return result;
}