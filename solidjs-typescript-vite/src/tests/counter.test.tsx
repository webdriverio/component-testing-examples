import { browser, $, expect } from '@wdio/globals'
import { cleanup, render, screen } from 'solid-testing-library'

import { Counter } from '../components/counter'

describe('my component tests', () => {
  afterEach(cleanup)

  it('it starts with zero', async () => {
    render(() => <Counter />)
    const button = screen.getByRole('button');
    expect($(button)).toBePresent();
    expect($(button)).toHaveText(
      expect.stringContaining('Count: 0'));
  });

  it('it increases its value on click', async () => {
    render(() => <Counter />);
    const button = screen.getByRole('button');
    await $(button).click()
    expect($(button)).toHaveText(
      expect.stringContaining('Count: 1'));
    await $(button).click()
    expect(button).toHaveText(
      expect.stringContaining('Count: 2'));
  });
})
