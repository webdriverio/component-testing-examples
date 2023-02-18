import { test, expect } from '@playwright/experimental-ct-react'
import { Input, SideEffect } from './Input'

test.use({ viewport: { width: 500, height: 500 } })

test('Input Component: can be clicked without a side effect', async ({ mount }) => {
  const component = await mount(<Input />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})

test('Input Component: can not set value of input if input is disabled', async ({ mount }) => {
  const component = await mount(<Input sideEffect={0} />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  /**
   * test times out with log:
   *     waiting for element to be visible, enabled and editable
   */
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})

test('Input Component: can not set value of input if input has zero height', async ({ mount }) => {
  const component = await mount(<Input sideEffect={1} />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  /**
   * test times out with log:
   *     waiting for element to be visible, enabled and editable
   */
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})

test('Input Component: can not set value of input if input is invisible', async ({ mount }) => {
  const component = await mount(<Input sideEffect={2} />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  /**
   * test times out with log:
   *     waiting for element to be visible, enabled and editable
   */
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})

test('Input Component: can set value of input even though input is overlayed by another element', async ({ mount }) => {
  const component = await mount(<Input sideEffect={3} />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})

test('Input Component: can be set value even though input is out of bounds', async ({ mount }) => {
  const component = await mount(<Input sideEffect={4} />)
  const input = await component.getByPlaceholder('username')
  await expect(input).toHaveValue('')
  await input.fill('Hello World!')
  await expect(input).toHaveValue('Hello World!')
})
