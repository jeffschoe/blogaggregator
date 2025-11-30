import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    const res = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator",
            accept: "application/rss+xml",
        },
    });

    const xml = await res.text();
    const parser = new XMLParser();
    let result = parser.parse(xml); //result is a jObj

    const channel = result.rss?.channel;
    if (!channel) {
        throw new Error("failed to parse channel")
    }

    const title = channel.title;
    if (!(typeof title === "string" && title.trim().length > 0)) {
        throw new Error("missing channel metadata: title")
    }

    const link = channel.link;
    if (!(typeof link === "string" && link.trim().length > 0)) {
        throw new Error("missing channel metadata: link")
    }

    const description = channel.description;
    if (!(typeof description === "string" && description.trim().length > 0)) {
        throw new Error("missing channel metadata: description")
    }

    let items = channel.item;
    if (!Array.isArray(items)) {
        items = [];
    }

    const rssItems: RSSItem[] = [];

    for (const item of items) {

        const itemTitle = item.title;
        if (!(typeof itemTitle === "string" && itemTitle.trim().length > 0)) {
            console.log("missing RSS item: title... skipping item")
            continue; // don't build the item
        }

        const itemLink = item.link;
        if (!(typeof itemLink === "string" && itemLink.trim().length > 0)) {
            console.log("missing RSS item: link... skipping item")
            continue; // don't build the item
        }

        const itemDescription = item.description;
        if (!(typeof itemDescription === "string" && itemDescription.trim().length > 0)) {
            console.log("missing RSS item: description... skipping item")
            continue; // don't build the item
        }

        const itemPubDate = item.pubDate;
        if (!(typeof itemPubDate === "string" && itemPubDate.trim().length > 0)) {
            console.log("missing RSS item: pubDate... skipping item")
            continue; // don't build the item
        }

        rssItems.push(
            {
                title: itemTitle,
                link: itemLink,
                description: itemDescription,
                pubDate: itemPubDate
            }
        );

    }

    const rss: RSSFeed = {
        channel: {
            title,
            link,
            description,
            item: rssItems,
        },
    };

    return rss;
 
}