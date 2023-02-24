import { Zoom } from './Zoom';

describe('Zoom component', () => {
  it.skip('can zoom in/out via scrolling', () => {
    cy.mount(<Zoom />)

    /**
     * without `ensureScrollable: false` the command fails due to:
     *     -> failed because this element is not scrollable
     */
    cy.get('img').scrollTo(0, -200, { ensureScrollable: false })

    /**
     * assertion fails, no scrolling emitted on the element
     */
    cy.get('.react-transform-component')
      .invoke('attr', 'style')
      .should('eq', 'transform: translate(-16px, -16px) scale(1.16)')
  })

  it('attempt to scroll via "cypress-real-events"', () => {
    cy.mount(<Zoom />)
    cy.get('img').realMouseDown()
    /**
     * TypeError: cy.get(...).realMouseWheel is not a function
     */
    cy.get('img').realMouseWheel({ deltaY: -100 })
    cy.get('.react-transform-component')
      .invoke('attr', 'style')
      .should('eq', 'transform: translate(-16px, -16px) scale(1.16)')
  })
})
