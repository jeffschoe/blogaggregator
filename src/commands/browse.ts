//browse.ts
import { printGatorLineBreak } from "../lib/db/queries/utils";
import { getPostsForUser } from "../lib/db/queries/posts";
import { User } from "../lib/db/schema";


export async function handlerBrowse(cmdName: string, user: User, ...args: string[]): Promise<void> {
  let limit = 2; // default
  
    if (args.length > 1) {
      throw new Error(`usage: ${cmdName} [limit]`);
    } 

    if (args.length === 1) {
      const specifiedLimit = Number(args[0]);
      
      if(!Number.isInteger(specifiedLimit) || specifiedLimit <= 0) {
        throw new Error(`invalid limit: ${args[0]}`);
      }

      limit = specifiedLimit;
    }
  
  const posts = await getPostsForUser(user.id, limit);

  printGatorLineBreak();
  console.log(`    ${limit} newest posts for ${user.name}`)
  printGatorLineBreak();
  console.log("");

  for (const post of posts) {
    console.log(`${post.publishedAt} from ${post.feedName}`);
    console.log(`--- ${post.title} ---`);
    console.log(`    ${post.description}`);
    console.log(`Link: ${post.url}`);
    printGatorLineBreak();
    console.log("");
  }
}