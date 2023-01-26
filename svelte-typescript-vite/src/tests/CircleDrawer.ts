/// <reference types="@wdio/globals/types" />
import { $, browser, expect } from '@wdio/globals'
import { render } from '@testing-library/svelte'
import CircleDrawer from '../lib/CircleDrawer.svelte'

describe('Svelte Component Testing', () => {
  async function setCircle (x?: number, y?: number) {
    const { component } = render(CircleDrawer)
    const root = component.$$.root as HTMLElement
    root.setAttribute('style', 'height: 500px')

    const $root = await $(root)

    const size = await $root.getSize()
    const location = await $root.getLocation()
    await browser.action('pointer')
        .move({
            x: x || Math.round(location.x + (size.width / 2)),
            y: y || Math.round(location.y + (size.height / 2))
        })
        .down()
        .up()
        .perform()
  }

  async function openAdjustMenu (circle: WebdriverIO.Element) {
    const size = await circle.getSize()
    const location = await circle.getLocation()

    await browser.action('pointer')
      .move({
          x: Math.round(location.x + (size.width / 2)),
          y: Math.round(location.y + (size.height / 2))
      })
      .down({ button: 2 })
      .up({ button: 2 })
      .perform()
  }

  beforeEach(async () => {
    await browser.pause(100)
  })

  it('can set a circle', async () => {
    await setCircle()
    const circle = await $('circle')
    expect(await circle.getAttribute('cy')).toBe('400')
    expect(await circle.getAttribute('r')).toBe('50')
  })

  it('pop up modal for adjusting circle size', async () => {
    await setCircle()
    const circle = await $('circle')
    await openAdjustMenu(circle)
    expect($('.adjuster')).toBeExisting()
  })

  it('can modify size of circle', async () => {
    await setCircle()
    const circle = await $('circle')
    await openAdjustMenu(circle)

    const menu = await $('.adjuster input')
    const size = await menu.getSize()
    const location = await menu.getLocation()
    await browser.action('pointer')
      .move({
          x: Math.round(location.x + (size.width / 2)),
          y: Math.round(location.y + (size.height / 2))
      })
      .down({ button: 0 })
      .move({ x: Math.round(location.x + size.width) })
      .up({ button: 0 })
      .perform()
    expect(await circle.getAttribute('r')).toBe('100')

    await browser.action('pointer')
      .move({
          x: Math.round(location.x + (size.width / 2)),
          y: Math.round(location.y + (size.height / 2))
      })
      .down({ button: 0 })
      .move({ x: Math.round(location.x) })
      .up({ button: 0 })
      .perform()

    expect(await circle.getAttribute('r')).toBe('0')
  })
})
