import expect from 'expect'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../../src/App'

describe('Create React App Component', () => {
  it('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })  
})