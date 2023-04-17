import { browser, $, expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import Modal from '../components/modal'

describe('my component tests', () => {
  const ref = document.createElement('div')

  before(() => {
    document.body.parentElement!.style.height = '100%'
    document.body.style.height = '100%';
    document.body.appendChild(ref);
  })

  after(() => {
    document.body.removeChild(ref);
  })

  it('will trigger on click outside', async () => {
    render(() => <Modal />, ref)
    await expect($('.modal')).not.toBePresent()
    await $('button').click()
    await expect($('.modal')).toBePresent()
    await $('body').click()
    await expect($('.modal')).not.toBePresent()
  })

  it('will not trigger on click inside', async () => {
    render(() => <Modal />, ref)
    await expect($('.modal')).not.toBePresent()
    await $('button').click()
    await expect($('.modal')).toBePresent()
    await $('.modal').click()
    await expect($('.modal')).toBePresent()
  })
})
