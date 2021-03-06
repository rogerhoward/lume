import React, {Component} from 'react'
import OrgManager from '../../components/cms/OrgManager'
import withData from '../../apollo'
import Template from '../../components/shared/Template'
import getUser from '../../auth/getUser'

class New extends Component {

  static getInitialProps = async (ctx) => {
    try {

      let user = await getUser(ctx)

      return {
        user
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        {...this.props}
      >
        <OrgManager
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(New)
