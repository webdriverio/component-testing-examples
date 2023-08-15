import { h } from '@stencil/core'
import { $, expect } from '@wdio/globals';
import { render } from '@wdio/browser-runner/stencil';

import { MyComponent } from './my-component.js';

describe('my-component', () => {
  it('renders', async () => {
    render({
      components: [MyComponent],
      template: <my-component first="Stencil" last="'Don't call me a framework' JS" />
    });

    await expect($('my-component')).toHaveText('foo')
  });
});
