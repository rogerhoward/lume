import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Select, Option, Label} from '../../ui/forms'
import {Input, Textarea, ChangeImage} from '../DefaultEditors'
import ImageManager from '../ImageManager'
import DeleteStoryButton from '../DeleteStoryButton'
import StoryAssociator from '../StoryAssociator'
import StoryGroupSelector from '../StoryGroupSelector'

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  initialValues = {
    title: "",
    description: "",
    previewImageId: undefined,
    template: "original",
    visibility: "draft"
  }

  state = {
    ...this.initialValues,
    sync: true
  }

  render() {

    if (!this.props.story) return null

    const {
      state: {
        title,
        description,
        previewImageId,
        template,
        visibility
      },
      handleChange,
      handleSave,
      handleGroupSelectionSave,
      props: {
        storyId,
        router,
        story: {
          groups
        }
      }
    } = this

    return (
      <Container>
        <Top>
          <H3>
            Story Editor
          </H3>
        </Top>
        <Row>
          <Column>
            <Label>
              Template
            </Label>
            <Select
              name={"template"}
              onChange={handleChange}
              value={template}
            >
              <Option
                value={"original"}
              >
                Original
              </Option>
              <Option
                value={"slider"}
              >
                Slider
              </Option>
            </Select>
            <Label>
              Visibility
            </Label>
            <Select
              name={"visibility"}
              onChange={handleChange}
              value={visibility}
            >

              <Option
                value={"draft"}
              >
                Draft
              </Option>
              <Option
                value={"published"}
              >
                Published
              </Option>
            </Select>
            <Input
              label={"Title"}
              name={"title"}
              value={title}
              onChange={handleChange}
            />
            <Textarea
              label={"Description"}
              name={"description"}
              value={description}
              onChange={handleChange}
            />
            <StoryGroupSelector
              onGroupSelectionSave={handleGroupSelectionSave}
              selectedGroupIds={groups.map(group => group.id)}
            />
          </Column>
          <Column>
            <ChangeImage
              label={"Image"}
              name={"previewImageId"}
              value={previewImageId}
              onChange={handleChange}
            />
            <StoryAssociator
              storyId={storyId}
            />
            <DeleteStoryButton
              storyId={storyId}
            />
          </Column>
        </Row>

      </Container>
    )
  }

  bounce = true

  debounce = (func) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        2000
      )
    }
  }

  componentWillReceiveProps(nextProps){
    this.mapPropsToState(nextProps)
  }

  mapPropsToState = (nextProps) => {
    if (
      nextProps.story ||
      nextProps.storyId !== this.state.id
    ) {
      let {
        story,
        story: {
          previewImage
        }
      } = nextProps

      this.setState({
        ...story,
        previewImageId: previewImage ? previewImage.id : ""
      })
    }
  }

  handleGroupSelectionSave = (selectedGroupIds) => {

    this.props.setSaveStatus({
      saving: true,
    })

    this.props.editStory({
      setGroupsIds: selectedGroupIds
    })

    this.props.setSaveStatus({
      synced: true,
      saving: false,
      lastSave: Date.now()
    })

  }

  handleChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
        this.props.setSaveStatus({
          synced: false
        })
        this.debounce(this.handleSave)
      }
    )
  }

  handleSave = async () => {
    try {

      this.props.setSaveStatus({
        saving: true,
      })

      await this.props.editStory({
        ...this.state,
        previewImageId: this.state.previewImageId || undefined
      })

      this.props.setSaveStatus({
        synced: true,
        saving: false,
        lastSave: Date.now()
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillUnmount(){
    this.handleSave()
  }

}

const Top = styled.div`
  display: flex;
  justify-content:space-between;
  min-height: 70px;
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-sizing:border-box;
  overflow-y:scroll;
`



const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 50%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 400px;
`
