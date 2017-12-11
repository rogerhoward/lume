import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const joinOrganizationMutation = gql`
  mutation joinOrganization (
    $userId: ID!
    $organizationId: ID!
  ) {
    editUserOrganization(
      userId: $userId
      organizationId: $organizationId
    ) {
      id
      organizations {
        id
        subdomain
        role
      }
    }
  }
`



export const joinOrganization =  graphql(joinOrganizationMutation, {
  name: "joinOrganization"
})

const createOrganizationMutation = gql`
  mutation createOrganization (
    $subdomain: String!
    $name: String!
    $creatorId: ID!
  ) {
    createOrganization(
      subdomain: $subdomain
      name: $name
      creatorId: $creatorId
    ) {
      id
      name
      subdomain
    }
  }
`

export const createOrganization = graphql(createOrganizationMutation, {
  name: "createOrganization"
})
