import { $, expect } from '@wdio/globals'

import '../../src/my-element'

describe('Lit component testing', () => {
    it('should increment value on click', async () => {
        const elem = document.createElement('my-element')
        document.body.appendChild(elem)

        /**
         * Deep selector is not yet supported in browser land due to its CJS
         * dependencies, see https://github.com/webdriverio/webdriverio/issues/9126
         */
        const button = (await $(elem)).$('>>>button')
        await expect(button).toHaveText('count is 0')

        await button.click()
        await button.click()

        await expect(button).toHaveText('count is 2')
    })
})
