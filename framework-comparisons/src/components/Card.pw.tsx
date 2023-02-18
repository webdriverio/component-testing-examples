import { test, expect } from '@playwright/experimental-ct-react'
import { Card } from './Card'

test.use({ viewport: { width: 500, height: 500 } })

test.skip('Card Component: can be clicked without a side effect', async ({ mount }) => {
  const component = await mount(<Card />)
  await expect(component).toContainText('count is 0')
  await component.getByText('count is 0').click()
  await expect(component).toContainText('count is 1')
})

test.skip('Card Component: fails because element is not visible', async ({ mount }) => {
  const component = await mount(<Card sideEffect={2} />)
  await expect(component).toContainText('count is 0')
  /**
   * times out due to: element is not visible - waiting...
   */
  await component.getByText('count is 0').click()
  await expect(component).toContainText('count is 1')
})

test.skip('Card Component: fails because element has zero height', async ({ mount }) => {
  const component = await mount(<Card sideEffect={1} />)
  await expect(component).toContainText('count is 0')
  /**
   * times out due to: element is not visible - waiting...
   */
  await component.getByText('count is 0').click()
  await expect(component).toContainText('count is 1')
})

test.skip('Card Component: fails because another element is laying over the button', async ({ mount }) => {
  const component = await mount(<Card sideEffect={3} />)
  await expect(component).toContainText('count is 0')
  /**
   * times out due to: <div>You can't click it!</div> intercepts pointer events
   */
  await component.getByText('count is 0').click()
  await expect(component).toContainText('count is 1')
})

test.skip('Card Component: passes as Playwright magically puts the button into position', async ({ mount }) => {
  const component = await mount(<Card sideEffect={4} />)
  await expect(component).toContainText('count is 0')
  await component.getByText('count is 0').click()
  await expect(component).toContainText('count is 1')
})
