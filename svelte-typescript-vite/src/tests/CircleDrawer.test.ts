/// <reference types="@wdio/globals/types" />
import { $, browser, expect } from '@wdio/globals'
import { render } from '@testing-library/svelte'
import CircleDrawer from '../lib/CircleDrawer.svelte'

describe('Svelte Component Testing', () => {
  let root: HTMLElement

  beforeEach(async () => {
    const { component } = render(CircleDrawer)
    root = component.$$.root as HTMLElement
    root.setAttribute('style', 'height: 500px')
  })

  async function setCircle (x?: number, y?: number) {
    const $root = await $(root)
    await browser.action('pointer')
        .move(x && y ? { x, y } : { origin: $root })
        .down()
        .up()
        .perform()
  }

  async function openAdjustMenu (circle: WebdriverIO.Element) {
    await browser.action('pointer')
      .move({ origin: circle })
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
    expect(await circle.getAttribute('cy')).toBe('375')
    expect(await circle.getAttribute('r')).toBe('50')
    expect(await circle.getAttribute('fill')).toBe('#ccc')

    await setCircle(200, 200)
    const circles = await $$('circle')
    expect(circles).toHaveLength(2)
    expect(await circle.getAttribute('fill')).toBe('white')

    await circle.click()
    expect(await circle.getAttribute('fill')).toBe('#ccc')

    await $('button=undo').click()
    await expect($$('circle')).toBeElementsArrayOfSize(1)

    await $('button=redo').click()
    await expect($$('circle')).toBeElementsArrayOfSize(2)
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
      .move({ origin: menu })
      .down({ button: 0 })
      .move({ x: Math.round(location.x + size.width) })
      .up({ button: 0 })
      .perform()
    expect(await circle.getAttribute('r')).toBe('100')

    await browser.action('pointer')
      .move({ origin: menu })
      .down({ button: 0 })
      .move({ x: Math.round(location.x) })
      .up({ button: 0 })
      .perform()

    expect(await circle.getAttribute('r')).toBe('0')
  })
})
