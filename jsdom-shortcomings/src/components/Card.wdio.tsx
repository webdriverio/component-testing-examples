import { expect, $ } from '@wdio/globals'
import { render } from '@testing-library/react'

import { Card, SideEffect } from '../components/Card'
import '../App.css'

describe('Card Component', () => {
    it('can be clicked without a side effect', async () => {
        const { container } = render(<Card />)

        const $container = $(container)
        await expect($container).toHaveTextContaining('count is 0')
        await $container.$('button').click()
        await expect($container).toHaveTextContaining('count is 1')
    })

    it('fails because element is not visible', async () => {
        const { container } = render(<Card sideEffect={SideEffect.INVISIBLE} />)

        const $container = $(container)
        /**
         * text can not be received because element is not visible
         */
        await expect($container).not.toHaveTextContaining('count is 0')
        /**
         * fails due to "element not interactable" error
         */
        await $container.$('button').click()
        await expect($container).not.toHaveTextContaining('count is 1')
    })

    it('fails because element has zero height', async () => {
        const { container } = render(<Card sideEffect={SideEffect.ZERO_HEIGHT} />)

        const $container = $(container)
        await expect($container).toHaveTextContaining('count is 0')
        /**
         * fails due to "element not interactable: element has zero size" error
         */
        await $container.$('button').click()
        await expect($container).toHaveTextContaining('count is 1')
    })

    it('fails because another element is laying over the button', async () => {
        const { container } = render(<Card sideEffect={SideEffect.OVERLAYING_ELEMENT} />)

        const $container = $(container)
        await expect($container).toHaveTextContaining('count is 0')
        /**
         * fails due to "element click intercepted: Element <button aria-label="counter">...</button> is not clickable at point (68, 402). Other element would receive the click: <div style="...">...</div>" error
         */
        await $container.$('button').click()
        await expect($container).toHaveTextContaining('count is 1')
    })

    it('fails because the element is outside the viewport', async () => {
        const { container } = render(<Card sideEffect={SideEffect.OUT_OF_BOUNDS} />)
        const $container = $(container)

        /**
         * verify DOM node exists
         */
        expect(await $container.getHTML()).toContain('count is 0')

        /**
         * this fails nonetheless as element is out of viewport
         */
        await expect($container).not.toHaveTextContaining('count is 0')

        /**
         * fails due to "element not interactable" error
         */
        await $container.$('button').click()
        await expect($container).toHaveTextContaining('count is 1')
    })
})
