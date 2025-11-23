//users.ts
import { setUser } from "../config";
import { createUser, getUser } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) throw new Error(`usage: ${cmdName} <name>`);

    const userName = args[0];
    const existingUser = await getUser(userName);
    if (!existingUser) throw new Error(`error: user '${userName}' does not exist`);
    
    setUser(existingUser.name);
    console.log(`switched to user '${existingUser.name}' successfully!`);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) throw new Error(`usage: ${cmdName} <name>`);

    const userName = args[0];
    
    try { 
        //using t/c block allows us to catch cases of userName already existing in db 
        const user = await createUser(userName);
        setUser(user.name);
        console.log(`success: new user '${user.name}' registered`);
        console.log(`new user '${user.name}' details:`);
        console.log(user);
    } catch (error) {
        throw new Error(`error: user '${userName}' already exists or another database issue occurred.`);
  }


}