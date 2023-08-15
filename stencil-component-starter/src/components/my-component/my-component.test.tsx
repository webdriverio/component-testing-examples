import { h } from '@stencil/core'
import { $, expect } from '@wdio/globals';
import { render } from '@wdio/browser-runner/stencil';

import { MyComponent } from './my-component.js';

describe('my-component', () => {
  it('renders', async () => {
    render({
      components: [MyComponent],
      template: () => <my-component first="Stencil" last="'Don't call me a framework' JS" />
    });

    const component = $('my-component')
    await expect(component).toHaveText(`Hello, World! I'm Stencil 'Don't call me a framework' JS`)
    await expect((await $('>>>span').getCSSProperty('font-weight')).value).toBe(700)
  });
});
