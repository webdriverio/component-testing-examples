import { describe, it, vi } from "vitest"
import { render, waitFor, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import { InstantSearchComponent } from './InstantSearch'
import fixture from './__fixtures__/algolia.json'

vi.mock('algoliasearch/lite', () => ({
  default: vi.fn().mockReturnValue({
    search: vi.fn().mockImplementation(async () => {
      const fixture = await import('./__fixtures__/algolia.json')
      return Promise.resolve(fixture)
    }),
    searchForFacetValues: vi.fn(),
    addAlgoliaAgent: vi.fn(),
    clearCache: vi.fn()
  })
}))

describe('Card Component', () => {
  it('can be clicked without a side effect', async () => {
    const { debug, getByText, queryAllByRole, container } = render(<InstantSearchComponent />)

    // validate it finds items
    await waitFor(() => { expect(getByText('7 32GB - Black Onyx (Verizon)')).toBeInTheDocument() })

    // has correct item at the top
    expect(container.querySelector('.ais-Highlight')!.textContent)
      .toBe(fixture.results[0].hits[0].name)
    expect(container.querySelector('.ais-RefinementList-labelText')!.textContent)
      .toBe('Incipio')

    // orders brands, selected first
    await act(() => fireEvent.click(getByText('Samsung')))
    expect(container.querySelector('.ais-RefinementList-labelText')!.textContent)
      .toBe('Samsung')

    // can reset selection
    await act(() => fireEvent.click(queryAllByRole('button')[0]))
    expect(container.querySelector('.ais-RefinementList-labelText')!.textContent)
      .toBe('Incipio')
  })
})
