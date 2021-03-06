import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import groupFragment from '../fragments/group'

export const CreateGroupMutation = gql`
  mutation createGroup (
    $categoryId: ID!
  ) {
    createGroup(
      categoryId: $categoryId
    ) {
      ...GroupFragment
    }
  }
  ${groupFragment}
`

export const mutationConfig = {
  props: ({mutate, ownProps: {categoryId}}) => {
    return {
      createGroup: () => mutate({
        variables: {
          categoryId
        },
        refetchQueries: [
          "CategoryQuery"
        ]
      }),
    }
  },
}

export default graphql(CreateGroupMutation, mutationConfig)
