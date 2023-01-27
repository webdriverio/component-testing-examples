/// <reference types="@wdio/globals/types" />
import { $, expect, browser } from '@wdio/globals'
import { render } from '@testing-library/vue'
import CircleDrawer from '../components/CircleDrawer.vue'

describe('Vue Component Testing', () => {
  async function setCircle(x?: number, y?: number) {
    const { baseElement } = render(CircleDrawer)
    baseElement.setAttribute('style', 'height: 500px')

    const $root = await $(baseElement as HTMLElement)

    await browser.action('pointer')
      .move({ origin: $root })
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
    expect(await circle.getAttribute('cy')).toBe('310')
    expect(await circle.getAttribute('r')).toBe('50')
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
