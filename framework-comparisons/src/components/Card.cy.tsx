import { Card, SideEffect } from './Card';

describe('Card Component', () => {
  it('can be clicked without a side effect', () => {
    cy.mount(<Card />)
    cy.contains('count is 0')
    cy.get('button').click()
    cy.contains('count is 1')
  })

  it('fails because element is not visible', () => {
    cy.mount(<Card sideEffect={SideEffect.INVISIBLE} />)
    cy.contains('count is 0')
    /**
     * fails due to:
     * <button aria-label="counter" style="visibility: hidden;">count is 0</button>`
     * This element `<button>` is not visible because it has CSS property: `visibility: hidden`
     */
    cy.get('button').click()
    cy.contains('count is 1')
  })

  it('fails because element has zero height', () => {
    cy.mount(<Card sideEffect={SideEffect.ZERO_HEIGHT} />)
    cy.contains('count is 0')
    /**
     * fails due to:
     * <button aria-label="counter" style="padding: 0px; height: 0px; font-size: 0px; border: 0px;">count is 0</button>`
     * This element `<button>` is not visible because it has an effective width and height of: `0 x 0` pixels.
     */
    cy.get('button').click()
    cy.contains('count is 1')
  })

  it('fails because another element is laying over the button', () => {
    cy.mount(<Card sideEffect={SideEffect.OVERLAYING_ELEMENT} />)
    cy.contains('count is 0')
    /**
     * <button aria-label="counter">count is 0</button>`
     * is being covered by another element:
     * `<div style="position: absolute; top: 0px; width: 100px; height: 100px; background-color: red;">You can...</div>
     */
    cy.get('button').click()
    cy.contains('count is 1')
  })

  it('passes as Cypress magically puts the button into position', () => {
    cy.mount(<Card sideEffect={SideEffect.OUT_OF_BOUNDS} />)
    cy.contains('count is 0')
    cy.get('button').click()
    cy.contains('count is 1')
  })
})
