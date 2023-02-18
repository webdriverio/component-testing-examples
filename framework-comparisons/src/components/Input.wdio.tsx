import { expect, $ } from '@wdio/globals'
import { render } from '@testing-library/react'

import { Input, SideEffect } from '../components/Input'
import '../App.css'

describe('Input Component', () => {
  it('can be clicked without a side effect', async () => {
    const { container } = render(<Input />)

    const $input = $(container).$('input')
    await expect($input).toHaveValue('')
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })

  it('can not set value of input if input is disabled', async () => {
    const { container } = render(<Input sideEffect={SideEffect.DISABLED} />)
    const $input = $(container).$('input')
    await expect($input).toHaveValue('')
    /**
     * fails due to:
     *     Failed to execute command "elementClear": invalid element state: Element is not currently interactable and may not be manipulated
     */
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })

  it('fails because element is not visible', async () => {
    const { container } = render(<Input sideEffect={SideEffect.INVISIBLE} />)

    const $input = $(container).$('input')
    await expect($input).toHaveValue('')
    /**
     * fails due to "element not interactable" error
     */
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })

  it('fails because element has zero height', async () => {
    const { container } = render(<Input sideEffect={SideEffect.ZERO_HEIGHT} />)

    const $input = $(container).$('input')
    await expect($input).toHaveValue('')
    /**
     * fails due to "element not interactable: element has zero size" error
     */
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })

  it('passes even though another element is laying over the button', async () => {
    const { container } = render(<Input sideEffect={SideEffect.OVERLAYING_ELEMENT} />)

    const $input = $(container).$('input')
    await expect($input).toHaveValue('')
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })

  it('fails because the element is outside the viewport', async () => {
    const { container } = render(<Input sideEffect={SideEffect.OUT_OF_BOUNDS} />)
    const $input = $(container).$('input')

    await expect($input).toHaveValue('')
    /**
     * fails due to "element not interactable" error
     */
    await $input.setValue('Hello World!')
    await expect($input).toHaveValue('Hello World!')
  })
})
