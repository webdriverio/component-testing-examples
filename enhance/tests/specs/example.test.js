import { expect, browser } from '@wdio/globals'
import enhance from '@enhance/ssr'

import MyHeader from '../../app/elements/my-header.mjs'

describe('Enhance Framework', () => {
  it('should render MyHeader element correctly', async () => {
    const html = enhance({
      elements: {
        'my-header': MyHeader
      }
    })
    const actual = document.createElement('div')
    actual.innerHTML = (html`<my-header></my-header>`).replace(/<(\/*)(html|head|body)>/g, '')
    document.body.appendChild(actual)
    expect(await browser.$$('img').length).toBe(2)
  })
})

