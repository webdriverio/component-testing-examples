import { $ } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from '../../src/App'

describe('my component tests', () => {
    it('should do something cool', async () => {
        render(() => <App />, document.body as HTMLElement)
        await expect($('p')).toHaveText('Edit src/App.tsx and save to reload.')
    })
})

