import * as core from '@actions/core'
import * as fs from "fs";
import * as dotenv from 'dotenv'

const run = async (): Promise<void> => {
    try {
        core.debug('Starting reading .env id extraction.')

        const path = core.getInput('path')
        if (fs.existsSync(path) == false) {
            core.setFailed(`No .env file found on path ${path}`)
            return;
        }

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
