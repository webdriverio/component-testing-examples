/// <reference types="@wdio/globals/types" />
import { expect, browser, $ } from '@wdio/globals'
import { logDOM, render } from '@testing-library/react'

import { Zoom } from '../components/Zoom'
import '../App.css'

describe('Zoom Component', () => {
  it('can zoom in/out via scrolling', async () => {
    const { container } = render(<Zoom />)
    const $container = await $(container)

    // zoom in
    await browser.action('wheel').scroll({ origin: $container.$('img'), deltaY: -250 }).perform()
    await expect($container.$('.react-transform-component'))
      .toHaveAttrContaining('style', 'transform: translate(-16px, -16px) scale(1.16)')

    // zoom out
    await browser.action('wheel').scroll({ origin: $container.$('img'), deltaY: 250 }).perform()
    await expect($container.$('.react-transform-component'))
      .toHaveAttrContaining('style', 'transform: translate(0px, 0px) scale(1)')
  })

  it('can zoom in via gestures', async () => {
    const { container } = render(<Zoom />)
    const $container = await $(container)

    await browser.pause(5000)
    // zoom in
    await browser.actions([
      browser.action('pointer')
        .move({ origin: await $container.$('img'), x: 0, y: 0 })
        .down()
        .move({ x: -100, y: -100 })
        .up(),

      browser.action('pointer')
        .move({ origin: await $container.$('img'), x: 0, y: 0 })
        .down()
        .move({ x: 100, y: 100 })
        .up()
    ])
    await browser.pause(5000)
    await expect($container.$('.react-transform-component'))
      .toHaveAttrContaining('style', 'transform: translate(-16px, -16px) scale(1.16)')

    // zoom out
    await browser.actions([
      browser.action('pointer')
        .move({ x: -100, y: -100 })
        .down()
        .move({ origin: await $container.$('img'), x: 0, y: 0 })
        .up(),

      browser.action('pointer')
        .move({ x: 100, y: 100 })
        .down()
        .move({ origin: await $container.$('img'), x: 0, y: 0 })
        .up()
    ])
    await expect($container.$('.react-transform-component'))
      .toHaveAttrContaining('style', 'transform: translate(0px, 0px) scale(1)')
  })
})
