import { html, render } from 'lit'
import { $, expect } from '@wdio/globals'

import '../../src/my-element'

describe('Lit component testing', () => {
    it('should increment value on click', async () => {
        render(
            html`<my-element />`,
            document.body
        )

        const button = (await $('my-element')).$('>>>button')
        await expect(button).toHaveText('count is 0')

        await button.click()
        await button.click()

        await expect(button).toHaveText('count is 2')
    })
})
