//config.ts
// This is where we'll handle reading and writing the JSON file.
import fs from "fs"; //file system module, which allows you to read and write files.
import os from "os"; //provides operating system-related utility methods.
import path from "path"; //provides utilities for working with file and directory paths.l

type Config = {
// represents the Config JSON file structure
// use camelCase, even though JSON keys are in snake_case
    dbUrl: string,
    currentUserName: string
};

export function setUser(userName: string): void {
    /* writes a Config object to the JSON file after setting the 
     * current_user_name field
     */
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}

function validateConfig(rawConfig: any): Config {
    /* used by readConfig to validate the result of JSON.parse.
     * ensure required fields exist and convert to your camelCase Config.
     * If validation fails, throw a descriptive error.
     *
     * ensure raw.db_url is a non-empty string, else throw
     * set currentUserName = typeof raw.current_user_name === "string" ? raw.current_user_name : ""
     * return { dbUrl: raw.db_url, currentUserName }
     */
    if (rawConfig === null || typeof(rawConfig) !== "object") {
        throw new Error('config JSON must be a non-null Object');
    }

    const dbUrl = rawConfig.db_url;
    if (typeof dbUrl !== "string" || !dbUrl.trim()) {
        throw new Error('Config missing required field: db_url');
    }

    const nameVal = rawConfig.current_user_name;
    const currentUserName = typeof nameVal === "string" ? nameVal : "";

    return {dbUrl, currentUserName};
}

export function readConfig(): Config {
    /* reads the JSON file found at ~/.gatorconfig.json and returns a 
     * Config object. It should read the file from the HOME directory, 
     * then decode the JSON string into a new Config object.
     */
    const fullPath: string = getConfigFilePath();
    const data = fs.readFileSync(fullPath, {encoding: 'utf-8',});
    try {
        //takes a JSON-formatted string and converts it into a TypeScript object
        const rawConfig: any = JSON.parse(data);
        return validateConfig(rawConfig);
    } catch (err) {
        throw new Error(`Failed to read config, possibly invalid JSON in: ${fullPath}. ${String(err)}`);
    }
}

function getConfigFilePath(): string {
    const configFileName = ".gatorconfig.json";
    const homeDir = os.homedir();
    return path.join(homeDir, configFileName);
}

function writeConfig(config: Config): void {
    const fullPath: string = getConfigFilePath();
    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    };
    
    const data = JSON.stringify(rawConfig, null, 2);
    fs.writeFileSync(fullPath, data, { encoding: "utf-8"});
}


