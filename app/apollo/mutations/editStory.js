import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'


const editStory = gql`
  mutation editStory (
    $id: ID!
    $title: String
    $description: String
    $template: TemplateEnum
    $previewImageId: ID
    $visibility: VisibilityEnum
    $addRelatedStoryId: ID
    $removeRelatedStoryId: ID
    $setGroupsIds: [ID]
  ) {
    editStory(
      id: $id
      title: $title
      description: $description
      previewImageId: $previewImageId
      template: $template
      visibility: $visibility
      addRelatedStoryId: $addRelatedStoryId
      removeRelatedStoryId: $removeRelatedStoryId
      setGroupsIds: $setGroupsIds
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}

`

const mutationConfig = {
  props: ({mutate, ownProps: {storyId} }) => ({
    editStory: ({
      title,
      description,
      previewImageId,
      template,
      visibility,
      addRelatedStoryId,
      removeRelatedStoryId,
      setGroupsIds
    }) => mutate({
      variables: {
        id: storyId,
        title,
        description,
        previewImageId,
        template,
        visibility,
        addRelatedStoryId,
        removeRelatedStoryId,
        setGroupsIds
      },
    }),
  }),

}

export default graphql(editStory, mutationConfig)
