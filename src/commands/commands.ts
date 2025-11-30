//commands.ts
export type CommandHandler = (
    cmdName: string, 
    ...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

// called from the main index.ts to register our commands and 
// store them in the registry
export function registerCommand( 
    registry: CommandsRegistry, 
    cmdName: string, 
    handler: CommandHandler
): void {
    //registers a new handler function for a command name
    registry[cmdName] = handler;
};

export async function runCommand( 
    registry: CommandsRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> {
    // runs a given command with the provided state if it exists
    const handler = registry[cmdName];
    if (!handler) throw new Error(`command <${cmdName}> is unknown and has not been registered yet`);
    
    await handler(cmdName, ...args);
};
