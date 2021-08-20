import * as core from '@actions/core'
import run from '../dotenv_to_setenv'

describe('Read sample .env', () => {
    it('Reads .env and converts to Github enviroment variables', async () => {
        const infoMock = jest.spyOn(core, 'info')
        const exportVariableMock = jest.spyOn(core, 'exportVariable')

        await run()

        // Assertions
        expect(infoMock).toHaveBeenCalledTimes(3)
        expect(infoMock).toHaveBeenCalledWith('Found hello: world')
        expect(infoMock).toHaveBeenCalledWith('Found foo: bar')
        expect(infoMock).toHaveBeenCalledWith('Found bar: foo,bar,baz')
        expect(exportVariableMock).toHaveBeenCalledTimes(3)
        expect(exportVariableMock).toHaveBeenCalledWith('foo', 'bar')
        expect(exportVariableMock).toHaveBeenCalledWith('hello', 'world')
        expect(exportVariableMock).toHaveBeenCalledWith('bar', 'foo,bar,baz')
    })
    it('Stops when .env does not exist', async () => {
        const infoMock = jest.spyOn(core, 'info')
        const exportVariableMock = jest.spyOn(core, 'exportVariable')
        const setFailedMock = jest.spyOn(core, 'setFailed')
        process.env['INPUT_PATH'] = '__tests__/blablabla'

        await run()

        // Assertions
        expect(setFailedMock).toHaveBeenCalledTimes(1)
        expect(setFailedMock).toHaveBeenCalledWith(expect.stringContaining('No .env file found on path'))
        expect(infoMock).toHaveBeenCalledTimes(0)
        expect(exportVariableMock).toHaveBeenCalledTimes(0)
    })
})


beforeEach(() => {
    jest.resetModules()
    process.env['INPUT_PATH'] = '__tests__/.env'
})

afterEach(() => {
    delete process.env['INPUT_PATH']
})
