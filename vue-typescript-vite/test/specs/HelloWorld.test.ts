import { $, expect, browser } from '@wdio/globals'
import { render } from '@testing-library/vue'
import HelloWorld from '../../src/components/HelloWorld.vue'

describe('Vue Component Testing', () => {
    it('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const { getByText } = render(HelloWorld)

        // getByText returns the first matching node for the provided text, and
        // throws an error if no elements match or if more than one match is found.
        const btn = getByText('count is 0')
        const button = await $(btn)

        // Dispatch a native click event to our button element.
        await button.click()
        await button.click()

        getByText('count is 2')
        await expect($('button=count is 2')).toExist()
    })
})