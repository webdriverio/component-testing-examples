import React from 'react';
import { expect } from '@wdio/globals'
import { render } from '@testing-library/react';
import App from './App';

async function getVisiblePage () {
  return $$('>>>.container').find((page) => page.isDisplayed());
}

describe('App', () => {
  it('renders without crashing', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });

  it('should be able to navigate to other tabs', async () => {
    const { baseElement } = render(<App />);
    const navLinks = await $(baseElement).$$('>>>ion-label');
    await navLinks[0].click();

    await expect(await getVisiblePage()).toHaveText(
      expect.stringContaining('Tab 1 page'));

    await navLinks[1].click();
    await expect(await getVisiblePage()).toHaveText(
      expect.stringContaining('Tab 2 page'));

    await navLinks[2].click();
    await expect(await getVisiblePage()).toHaveText(
      expect.stringContaining('Tab 3 page'));
  });
});
