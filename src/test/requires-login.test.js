import React from 'react'
import { shallow } from 'enzyme'
import requiresLogin from '../components/RequiresLogin'

describe('<requiresLogin />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn()
    shallow(<requiresLogin />)
  })
})
