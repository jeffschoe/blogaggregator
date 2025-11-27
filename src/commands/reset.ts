//reset.ts
import { deleteUsers } from "../lib/db/queries/users";

export async function handlerReset(_cmdName: string, ..._args: string[]): Promise<void> {
    try {
        const result = await deleteUsers();
        console.log('Database reset successfully!')
        process.exit(0);
    } catch (error) {
        console.log(`Database reset unsuccessful, error: ${error}`)
        process.exit(1);
    }
}