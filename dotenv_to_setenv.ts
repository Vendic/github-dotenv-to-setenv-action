import * as core from '@actions/core'
import * as fs from "fs";
import * as dotenv from 'dotenv'

const run = async (): Promise<void> => {
    try {
        core.debug('Starting reading .env id extraction.')

        const path = core.getInput('path')
        const absolutePath = __dirname + '/' + path;
        if (fs.existsSync(absolutePath) == false) {
            core.setFailed(`No .env file found on path ${absolutePath}`)
            return;
        }

        const content = fs.readFileSync(absolutePath, 'utf8')
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
