import { Input, SideEffect } from './Input';

describe('Input component', () => {
  it('can be clicked without a side effect', () => {
    cy.mount(<Input />)
    cy.get('input').should('have.value', '')
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })

  it('can not set value of input if input is disabled', () => {
    cy.mount(<Input sideEffect={SideEffect.DISABLED} />)
    cy.get('input').should('have.value', '')
    /**
     * failes due to:
     *     Timed out retrying after 4000ms: `cy.type()` failed because this element is `disabled`
     */
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })

  it('can not set value of input if input has zero height', () => {
    cy.mount(<Input sideEffect={SideEffect.ZERO_HEIGHT} />)
    cy.get('input').should('have.value', '')
    /**
     * failes due to:
     *      Timed out retrying after 4000ms: `cy.type()` failed because this element is not visible
     */
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })

  it('can not set value of input if input is invisible', () => {
    cy.mount(<Input sideEffect={SideEffect.INVISIBLE} />)
    cy.get('input').should('have.value', '')
    /**
     * fails due to:
     *      Timed out retrying after 4000ms: `cy.type()` failed because this element is not visible
     */
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })

  it('can not set value of input if input is overlayed by another element', () => {
    cy.mount(<Input sideEffect={SideEffect.OVERLAYING_ELEMENT} />)
    cy.get('input').should('have.value', '')
    /**
     * fails due to:
     *     Timed out retrying after 4000ms: `cy.type()` failed because this element:
     *     `<input placeholder="username" type="text">`
     *     is being covered by another element:
     *     `<div style="position: absolute; top: 0px; width: 200px; height: 100px; background-color: red;">You can...</div>`
     */
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })

  it('can not set value of input if input is out of bounds', () => {
    cy.mount(<Input sideEffect={SideEffect.OUT_OF_BOUNDS} />)
    cy.get('input').should('have.value', '')
    /**
     * fails due to:
     *      Timed out retrying after 4000ms: `cy.type()` failed because this element:
     *      `<input placeholder="username" type="text" style="position: absolute; left: 10000px;">`
     *      is being covered by another element:
     *      `<body>...</body>`
     */
    cy.get('input').type('Hello World')
    cy.get('input').should('have.value', 'Hello World')
  })
})
