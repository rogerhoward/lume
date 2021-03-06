import gql from 'graphql-tag'

const fragment = gql`
  fragment StoriesFragment on story {
    id
    title
    description
    previewImage{
      id
    }
    updatedAt
  }
`

export default fragment
