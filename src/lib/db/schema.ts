//schema.ts
import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
});

export type User = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert; // not used currently

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    lastFetchedAt: timestamp("last_fetched_at"),  
});

export type Feed = typeof feeds.$inferSelect;
export type newFeed = typeof feeds.$inferInsert; // not used currently

export const feedFollows = pgTable("feed_follows", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),  
    feedId: uuid("feed_id")
        .notNull()
        .references(() => feeds.id, { onDelete: "cascade" }), 
}, 
(t) => ({ unq: unique("feed_follows_user_id_feed_id_unique")
    .on(t.userId, t.feedId),
}));

export type FeedFollow = typeof feedFollows.$inferSelect;
export type newFeedFollow = typeof feedFollows.$inferInsert; // not used currently

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    title: text("title").notNull(),
    url: text("url").notNull().unique(),
    description: text("description").notNull(),
    publishedAt: timestamp("published_at").notNull(),
    feedId: uuid("feed_id")
        .notNull()
        .references(() => feeds.id, { onDelete: "cascade" }),
     
});

export type Post = typeof posts.$inferSelect; // not used currently
export type NewPost = typeof posts.$inferInsert;

/**
 * typeof posts.$inferInsert → shape of data you insert, doesn't require you to build optional fields
 * typeof posts.$inferSelect → shape of data you select, all columns present including id, createdAt, etc
 */