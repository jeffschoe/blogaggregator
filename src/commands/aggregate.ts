//aggregate.ts
import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { fetchFeed } from "../lib/rss";
import { Feed } from "../lib/db/schema"
import { parseDuration } from "../lib/time";


export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    /**
     * const feedURL = "https://www.wagslane.dev/index.xml";
     * const feedData = await fetchFeed(feedURL);
     * const feedDataStr = JSON.stringify(feedData, null, 2);
     * console.log(feedDataStr);
     */

    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time_between_reqs>`);
    }

    const timeArg = args[0];
    const timeBetweenRequests = parseDuration(timeArg); // in milliseconds
    if (!timeBetweenRequests) {
        throw new Error(
            `invalid duration: <${timeArg}> — example valid formats for <time_between_reqs>: <1h>, <30m>, <15s> or <3500ms>`
        );
    }

    console.log(`Collecting feeds every ${timeArg}...\n`)

    scrapeFeeds().catch(handleError); //**no await, start scrapeFeeds, don’t wait for it to finish before moving on.  */

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (!feed) {
        console.log(`No feeds to fetch.`);
        return;
    }
    console.log(`\n================================================`);
    console.log(`Found a feed to fetch!`);
    console.log(`================================================\n`);

    await scrapeFeed(feed);
}

async function scrapeFeed(feed: Feed) {
    await markFeedFetched(feed.id)

    const feedData = await fetchFeed(feed.url);
    console.log(`\n================================================`);
    console.log(
        `Feed ${feed.name} collected, ${feedData.channel.item.length} posts found`,
    );
    console.log(`================================================`);
    
    for (const item of feedData.channel.item) {
        console.log(item.title);
    }
}

function handleError(err: unknown) {
    console.error(
        `Error scraping feeds: ${err instanceof Error ? err.message : err}`
    )
}