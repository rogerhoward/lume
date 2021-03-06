import gql from 'graphql-tag'
import categoryFragment from './category'

const fragment = gql`
  fragment OrganizationFragment on organization {
    id
    name
    subdomain
    emailDomain
    customImageApiEnabled
    customImageEndpoint
    customObjApiEndpoint
    customObjApiEnabled
    categories {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`

export default fragment
