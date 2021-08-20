import * as core from '@actions/core'
import * as fs from "fs";
import * as dotenv from 'dotenv'
import * as os from "os";
import * as path from "path";

function getAbsolutePath(inputFilePath: string): string {
    if (inputFilePath[0] !== "~")
        return path.resolve(inputFilePath);

    const homeDirectory = os.homedir();
    if (homeDirectory)
        return path.join(homeDirectory, inputFilePath.slice(1));

    throw new Error("Unable to resole `~` to HOME");
}

const run = async (): Promise<void> => {
    try {
        core.debug('Starting reading .env id extraction.')
        const path = getAbsolutePath(core.getInput("path", {required: true}));
        core.debug("Path : " + path);

        // if (fs.existsSync(path) == false) {
        //     core.setFailed(`No .env file found on path ${path}`)
        //     return;
        // }

        const content = fs.readFileSync(path, 'utf8')
        const buffer = Buffer.from(content)
        const dotEnvConfig = dotenv.parse(buffer)

        for (const [key, value] of Object.entries(dotEnvConfig)) {
            core.info(`Found ${key}: ${value}`);
            core.exportVariable(key, value)
        }
    } catch (error) {
        core.setFailed(`Action failed: ${error}`)
    }
}

run()

export default run
