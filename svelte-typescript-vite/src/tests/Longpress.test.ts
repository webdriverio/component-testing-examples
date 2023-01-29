import { $, browser, expect } from '@wdio/globals'
import { render } from '@testing-library/svelte'
import Longpress from '../lib/Longpress.svelte'

describe('Svelte Component Testing', () => {
  it('increments value on click', async () => {
    const { getByText } = render(Longpress)
    const $btn = await $(getByText('press and hold'))

    await expect($('p')).not.toBeExisting()
    await browser.action('pointer')
      .move({ origin: $btn })
      .down()
      .pause(2500)
      .up()
      .perform()

    await expect($('p')).toBeExisting()

    await browser.action('pointer')
      .move({ x: 0, y: 0 }) // move out
      .move({ origin: $btn }) // move back in
      .perform()
    await expect($('p')).not.toBeExisting()
  })
})
