//users.ts
import { readConfig, setUser } from "../config";
import { createUser, getUser, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) throw new Error(`usage: ${cmdName} <name>`);

    const userName = args[0];
    setUser(userName);
    console.log(`switched to user '${userName}' successfully!`);
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

export async function handlerListUsers(_cmdName: string, ..._args: string[]): Promise<void> {
    
    const currentUserName = readConfig().currentUserName;
    const users = await getUsers();

    for (const user of users) {
        if (user.name === currentUserName) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
 
}