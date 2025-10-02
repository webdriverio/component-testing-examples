/// <reference types="@wdio/globals/types" />
import { $, $$, expect, browser } from '@wdio/globals'
import { render, cleanup } from '@testing-library/vue'
import CircleDrawer from '../components/CircleDrawer.vue'

describe('Vue Component Testing', () => {
  afterEach(() => {
    cleanup()
  })

  async function setCircle (x?: number, y?: number, root?: HTMLElement) {
    const $root = await $(root!)
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

  it('can set a circle', async () => {
    const { baseElement, container } = render(CircleDrawer)
    const root = baseElement as HTMLElement
    baseElement.setAttribute('style', 'height: 500px')
    await browser.pause(100)
    
    await setCircle(undefined, undefined, root)
    const $container = await $(container)
    let circles = await $container.$$('circle')
    expect(circles).toHaveLength(1)
    expect(await circles[0].getAttribute('cy')).toBe('250')
    expect(await circles[0].getAttribute('r')).toBe('50')
    expect(await circles[0].getAttribute('fill')).toBe('#fff')

    await setCircle(200, 200, root)
    circles = await $container.$$('circle')

    expect(circles).toHaveLength(2)
    // After adding a second circle, no circle should be selected
    expect(await circles[0].getAttribute('fill')).toBe('#fff')
    expect(await circles[1].getAttribute('fill')).toBe('#fff')

    await $container.$('button=Undo').click()
    circles = await $container.$$('circle')
    expect(circles).toHaveLength(1)

    await $container.$('button=Redo').click()
    circles = await $container.$$('circle')
    expect(circles).toHaveLength(2)
  })

  it('pop up modal for adjusting circle size', async () => {
    const { baseElement, container } = render(CircleDrawer)
    const root = baseElement as HTMLElement
    baseElement.setAttribute('style', 'height: 500px')
    await browser.pause(100)
    
    await setCircle(undefined, undefined, root)
    const $container = await $(container)
    const circle = await $container.$('circle')
    await openAdjustMenu(circle)
    expect($container.$('.dialog')).toBeExisting()
  })

  it('can modify size of circle', async () => {
    const { baseElement, container } = render(CircleDrawer)
    const root = baseElement as HTMLElement
    baseElement.setAttribute('style', 'height: 500px')
    await browser.pause(100)
    
    await setCircle(undefined, undefined, root)
    const $container = await $(container)
    const circle = await $container.$('circle')
    await openAdjustMenu(circle)

    const menu = await $container.$('.dialog input')
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
