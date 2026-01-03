//posts.ts
import { db } from "..";
import { eq, desc } from "drizzle-orm";
import { posts, NewPost, feedFollows, feeds } from "../schema";


export async function createPost(post: NewPost) {
  const [result] = await db
  .insert(posts)
  .values(post)
  .onConflictDoNothing({ target: posts.url}) //return undefined to skip existing posts
  .returning();

  return result;
}

export async function getPostsForUser(userId: string, numPosts: number) {
  const result = await db
  .select({
    id: posts.id,
    title: posts.title,
    url: posts.url,
    description: posts.description,
    publishedAt: posts.publishedAt,
    feedId: posts.feedId,
    feedName: feeds.name,
  })
  .from(posts)
  .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
  .innerJoin(feeds, eq(posts.feedId, feeds.id))
  .where(eq(feedFollows.userId, userId))
  .orderBy(desc(posts.publishedAt))
  .limit(numPosts);
  
  return result;
}