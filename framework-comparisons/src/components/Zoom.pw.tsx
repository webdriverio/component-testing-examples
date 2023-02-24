import { test, expect } from '@playwright/experimental-ct-react'
import { Zoom } from './Zoom'

test.use({ viewport: { width: 500, height: 500 } })

test('Zoom Component: can zoom in/out via scrolling', async ({ mount, page }) => {
  const component = await mount(<Zoom />)

  await component.locator('.react-transform-component').hover()
  await page.mouse.wheel(0, -200)

  const style = await component.locator('.react-transform-component').getAttribute('style')
  await expect(style).toBe('transform: translate(-16px, -16.06px) scale(1.16);')
})

test('Zoom Component: can zoom in via gestures', () => {
  /**
   * see https://github.com/microsoft/playwright/issues/2903
   */
  throw new Error('Not supported')
})
