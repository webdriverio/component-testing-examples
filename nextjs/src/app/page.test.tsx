
import React from 'react'
import { expect, $ } from '@wdio/globals'
import { render } from '@testing-library/react'

import Home from './page'

describe('React Component Tests', () => {
  it('should test component with WebdriverIO', async () => {
    render(<Home />)

    const component = await $('p')
    await expect(component).toHaveText(
      expect.stringContaining('Get started by editing')
    )
  })
})
