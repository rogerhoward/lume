import React from 'react'
import { shallow} from 'enzyme'
import CmsHome from './CmsHome.component'

describe("CmsHome component", ()=> {

  let props

  let component

  let stubProps = {
    organization: {
      name: "mia"
    },
    user: {
      id: "123abc"
    }
  }


  const shallowComponent = () => {
    component = shallow(
      <CmsHome
        {...props}
      />
    )
  }

  beforeEach( () => {
    component = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowComponent()

    expect(component).toHaveLength(1)


  })


})
