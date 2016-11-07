import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Title from './Title'

chai.use(chaiEnzyme())

const title = shallow(<Title label="Hello, World" />)

describe('<Title />', () => {
  it('has a wrapping h1 tag', () => {
    expect(title).to.have.tagName('h1')
  })

  it('renders the label text', () => {
   expect(title).to.have.text('Hello, World')
 })

 context('with another label property set', () => {
   const title = shallow(<Title label="Reusable Components FTW" />)

   it('renders that label text', () => {
     expect(title).to.have.text('Reusable Components FTW')
   })
 })
})
