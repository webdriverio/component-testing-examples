import { $$, expect } from '@wdio/globals'
import { render } from '@testing-library/svelte'
import Hoverable from './__fixtures__/Hoverable.svelte'

const DEFAULT_TEXT = 'Hover over me!'
const FIRST_ELEM_HOVERED_TEXT = '1st element is being hovered upon.'
const SECOND_ELEM_HOVERED_TEXT = '2nd element is being hovered upon.'
const THIRD_ELEM_HOVERED_TEXT = '3rd element is being hovered upon.'

describe('Svelte Component Testing', () => {
  it('increments value on click', async () => {
    const { getAllByText, getByText, queryByText } = render(Hoverable)

    const elems = getAllByText(DEFAULT_TEXT)
    expect(elems).toHaveLength(3)

    const $elems = await $$(elems)

    await $elems[1].moveTo()
    expect(queryByText(FIRST_ELEM_HOVERED_TEXT)).not.toBeTruthy()
    expect(getByText(SECOND_ELEM_HOVERED_TEXT)).toBeTruthy()
    expect(queryByText(THIRD_ELEM_HOVERED_TEXT)).not.toBeTruthy()

    await $elems[2].moveTo()
    expect(queryByText(FIRST_ELEM_HOVERED_TEXT)).not.toBeTruthy()
    expect(queryByText(SECOND_ELEM_HOVERED_TEXT)).not.toBeTruthy()
    expect(getByText(THIRD_ELEM_HOVERED_TEXT)).toBeTruthy()

    await $elems[0].moveTo()
    expect(getByText(FIRST_ELEM_HOVERED_TEXT)).toBeTruthy()
    expect(queryByText(SECOND_ELEM_HOVERED_TEXT)).not.toBeTruthy()
    expect(queryByText(THIRD_ELEM_HOVERED_TEXT)).not.toBeTruthy()
  })
})
