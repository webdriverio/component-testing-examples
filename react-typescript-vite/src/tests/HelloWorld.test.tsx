/// <reference types="@wdio/globals/types" />
import 'react'
import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/react'
import App from '../App'

describe('React Component Testing', () => {
  it('increments value on click', async () => {
    // The render method returns a collection of utilities to query your component.
    render(<App />)

    const button = await $('button*=count is')

    // Dispatch a native click event to our button element.
    await button.click()
    await button.click()

    await expect($('button*=count is')).toHaveText('count is 2')
  })
})
