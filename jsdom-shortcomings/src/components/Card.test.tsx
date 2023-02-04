import { describe, it, expect } from "vitest"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Card, SideEffect } from '../components/Card'

describe('Card Component', () => {
    it('can be clicked without a side effect', () => {
        const { getByText, getByLabelText } = render(<Card />)
        expect(getByText('count is 0')).toBeInTheDocument()
        fireEvent.click(getByLabelText('counter'))
        expect(getByText('count is 1')).toBeInTheDocument()
    })

    it('can still be clicked with visibility side effect', () => {
        const { getByText, getByLabelText } = render(<Card sideEffect={SideEffect.INVISIBLE} />)
        expect(getByText('count is 0')).toBeInTheDocument()
        fireEvent.click(getByLabelText('counter'))
        expect(getByText('count is 1')).toBeInTheDocument()
    })

    it('can still be clicked with zero height side effect', () => {
        const { getByText, getByLabelText } = render(<Card sideEffect={SideEffect.ZERO_HEIGHT} />)
        expect(getByText('count is 0')).toBeInTheDocument()
        fireEvent.click(getByLabelText('counter'))
        expect(getByText('count is 1')).toBeInTheDocument()
    })

    it('can still be clicked with an overlaying element side effect', () => {
        const { getByText, getByLabelText } = render(<Card sideEffect={SideEffect.OVERLAYING_ELEMENT} />)
        expect(getByText('count is 0')).toBeInTheDocument()
        fireEvent.click(getByLabelText('counter'))
        expect(getByText('count is 1')).toBeInTheDocument()
    })
})
