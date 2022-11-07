import { $, expect, browser } from '@wdio/globals'
import { ElementReference } from '@wdio/protocols'

import '../../src/my-element'

describe('Lit component testing', () => {
    it('should increment value on click', async () => {
        const elem = document.createElement('my-element')
        document.body.appendChild(elem)

        /**
         * Deep selector is not yet supported in browser land due to its CJS
         * dependencies, see https://github.com/webdriverio/webdriverio/issues/9126
         */
        const elemId = (await $(elem)).elementId
        const shadowRoot = await browser.getElementShadowRoot(elemId)
        const button = $(await browser.findElementFromShadowRoot(
            shadowRoot['shadow-6066-11e4-a52e-4f735466cecf'],
            'css selector',
            'button'
        ) as ElementReference)
        await expect(button).toHaveText('count is 0')

        await button.click()
        await button.click()

        await expect(button).toHaveText('count is 2')
    })
})
