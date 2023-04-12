/// <reference types="@wdio/globals/types" />
import { $, $$, expect, browser } from '@wdio/globals'
import { render } from '@testing-library/vue'
import CircleDrawer from '../components/CircleDrawer.vue'

describe('Vue Component Testing', () => {
  let root: HTMLElement

  beforeEach(async () => {
    const { baseElement } = render(CircleDrawer)
    root = baseElement as HTMLElement
    baseElement.setAttribute('style', 'height: 500px')
  })

  async function setCircle (x?: number, y?: number) {
    const $root = await $(root)
    await browser.action('pointer')
      .move(x && y ? { x, y } : { origin: $root })
      .down()
      .up()
      .perform()
  }

  async function openAdjustMenu(circle: WebdriverIO.Element) {
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
    expect(await circle.getAttribute('cy')).toBe('250')
    expect(await circle.getAttribute('r')).toBe('50')
    expect(await circle.getAttribute('fill')).toBe('#fff')

    await setCircle(200, 200)
    const circles = await $$('circle')

    expect(circles).toHaveLength(2)
    expect(await circle.getAttribute('fill')).toBe('#fff')

    await $('button=Undo').click()
    await expect($$('circle')).toBeElementsArrayOfSize(1)

    await $('button=Redo').click()
    await expect($$('circle')).toBeElementsArrayOfSize(2)
  })

  it('pop up modal for adjusting circle size', async () => {
    await setCircle()
    const circle = await $('circle')
    await openAdjustMenu(circle)
    expect($('.dialog')).toBeExisting()
  })

  it('can modify size of circle', async () => {
    await setCircle()
    const circle = await $('circle')
    await openAdjustMenu(circle)

    const menu = await $('.dialog input')
    const size = await menu.getSize()
    const location = await menu.getLocation()
    await browser.action('pointer')
      .move({ origin: menu })
      .down({ button: 0 })
      .move({ x: Math.round(location.x + size.width) })
      .up({ button: 0 })
      .perform()
    expect(await circle.getAttribute('r')).toBe('300')

    await browser.action('pointer')
      .move({ origin: menu })
      .down({ button: 0 })
      .move({ x: Math.round(location.x) })
      .up({ button: 0 })
      .perform()

    expect(await circle.getAttribute('r')).toBe('1')
  })
})
