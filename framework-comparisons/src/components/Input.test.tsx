import { describe, it, expect } from "vitest"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Input, SideEffect } from '../components/Input'

describe('Input Component', () => {
  it('can set value of input without side effect', () => {
    const { getByPlaceholderText } = render(<Input />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('can not set value of input if input is disabled', () => {
    const { getByPlaceholderText } = render(<Input sideEffect={SideEffect.DISABLED} />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('can not set value of input if input has zero height', () => {
    const { getByPlaceholderText } = render(<Input sideEffect={SideEffect.ZERO_HEIGHT} />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('can not set value of input if input has invisible', () => {
    const { getByPlaceholderText } = render(<Input sideEffect={SideEffect.INVISIBLE} />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('can not set value of input if input is overlayed by another element', () => {
    const { getByPlaceholderText } = render(<Input sideEffect={SideEffect.OVERLAYING_ELEMENT} />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('can not set value of input if input is out of bounds', () => {
    const { getByPlaceholderText } = render(<Input sideEffect={SideEffect.OUT_OF_BOUNDS} />)
    const input = getByPlaceholderText('username') as HTMLInputElement
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })
})
