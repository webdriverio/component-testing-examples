/// <reference types="@wdio/globals/types" />
import { expect, browser, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { render } from '@testing-library/react'

import { InstantSearchComponent } from './InstantSearch'
import fixture from './__fixtures__/algolia.json'
import './InstantSearch.css'

mock('algoliasearch/lite', () => ({
  default: fn().mockReturnValue({
    search: fn().mockImplementation(async () => {
      const fixture = await import('./__fixtures__/algolia.json')
      return Promise.resolve(fixture)
    }),
    searchForFacetValues: fn(),
    addAlgoliaAgent: fn(),
    clearCache: fn()
  })
}))

describe('InstantSearch Component', () => {
  it('works without making requests', async () => {
    // render component
    render(<InstantSearchComponent />)

    // validate it finds items
    await browser.waitUntil(
      async () => (await $$('.right-panel .ais-Hits-list li')).length === 8
    )

    // has correct item at the top
    await expect($('.ais-Highlight')).toHaveText(fixture.results[0].hits[0].name)
    await expect($('.ais-RefinementList-item')).toHaveText('Incipio 608')

    // orders brands, selected first
    await $('.ais-RefinementList-item=Samsung 292').click()
    await expect($('.ais-RefinementList-item')).toHaveText('Samsung 292')

    // can reset selection
    await $('.ais-ClearRefinements-button').click()
    await expect($('.ais-RefinementList-item')).toHaveText('Incipio 608')
    await browser.debug()
  })
})
