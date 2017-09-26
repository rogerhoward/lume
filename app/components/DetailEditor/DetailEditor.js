import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageManager from '../ImageManager'
import {Button} from '../../ui/buttons'
import {Input, Label, TextArea} from '../../ui/forms'
import {H2} from '../../ui/h'
import {ExpanderContainer, Expander} from '../../ui/expander'
import Image from '../Image'
import Modal from '../../ui/modal'
import Snackbar from '../../ui/Snackbar'
import PropTypes from 'prop-types'
import Zoomer from '../Zoomer'

export default class DetailEditor extends Component {

  static displayName = "DetailEditor"

  static propTypes = {
    orgId: PropTypes.string,
    detailId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateDetail: PropTypes.func.isRequired
  }

  state = {
    title: "",
    description: "",
    imageModal: false,
    additionalImagesModal: false,
    snackMessage: "",
    snackId: "",
    expanded: true
  }

  render () {
    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          detail: {
            id: detailId,
            index,
            image,
            additionalImages
          }
        },
        orgId
      },
      state: {
        title,
        description,
        imageModal,
        snackMessage,
        snackId,
        deleteModal,
        additionalImagesModal,
        expanded
      },
      save,
      handleChange,
      handleImageSave,
      handleAdditionalImageSave,
      handleRemoveAdditionalImages,
      deleteDetail,
      saveGeometry
    } = this
    return (
      <Expander
        onArrowClick={()=>this.setState(({expanded}) => ({expanded: !expanded}))}
        expanded={expanded}
        header={(
          <Row>
            <Row>
              <H2>{index + 1}</H2>
              <Input
                name={"title"}
                value={title}
                onChange={handleChange}
              />
            </Row>
            <Image
              imageId={(image) ? image.id : false}
              height={"50px"}
              quality={"s"}
            />
            <Button
              onClick={()=>this.setState({imageModal: true})}
              color={"white"}
            >
              Change Image
            </Button>
            <Modal
              open={imageModal}
              onClose={()=>this.setState({imageModal: false})}
              header={"Change Detail Image"}
            >
              <ImageManager
                imageId={(image) ? image.id : false}
                orgId={orgId}
                onImageSave={handleImageSave}
              />
            </Modal>
            <Snackbar
              snackId={snackId}
              message={snackMessage}
            />
            <Button
              color={"red"}
              onClick={()=>this.setState({deleteModal: true})}
            >
              Delete Detail
            </Button>
            <Modal
              open={deleteModal}
              onClose={()=>this.setState({deleteModal: false})}
              footer={(
                <Row>
                  <Button>
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteDetail}
                    color={"red"}
                  >
                    Delete Detail
                  </Button>
                </Row>
              )}
            >
              Do you want to delete this detail?
            </Modal>
          </Row>
        )}
      >
        <Row>
          <Column>
            <Label>Detail description</Label>
            <TextArea
              name={"description"}
              value={description}
              onChange={handleChange}
            />
            <Row>
              {additionalImages.map( image => (
                <Column
                  key={image.id}
                >
                  <Image
                    imageId={image.id}
                    size={"50px"}
                    thumb
                  />
                  <Button
                    color={"red"}
                    onClick={() => handleRemoveAdditionalImages(image.id)}
                  >
                    Remove
                  </Button>
                </Column>

              ))}
            </Row>
            <Button
              onClick={()=>this.setState({additionalImagesModal: true})}
            >
              New Additional Image
            </Button>
            <Modal
              onClose={()=>this.setState({additionalImagesModal: false})}
              header={"Add New Additional Image to Detail"}
              open={additionalImagesModal}
            >
              <ImageManager
                orgId={orgId}
                onImageSave={handleAdditionalImageSave}
              />
            </Modal>
            <Snackbar
              message={snackMessage}
              snackId={snackId}
            />
          </Column>
          <ZoomerContainer>
            {(image) ? (
              <Zoomer
                detailId={detailId}
                crop={true}
                onCrop={saveGeometry}
              />
            ) : null}
          </ZoomerContainer>
        </Row>
      </Expander>
    )
  }

  componentWillReceiveProps({data}){
    if (!data.loading) {
      let keys = Object.keys(data.detail)
      keys.forEach( key => this.setState({[key]: data.detail[key] || ""}))
    }
  }




  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.title !== this.state.title ||
      prevState.description !== this.state.description
    ) {
      this.debounce(this.save)
    }
  }


  handleRemoveAdditionalImages = async(removeAdditionalImageId) => {
    try {
      const {
        detailId,
        editOrCreateDetail,
        data: {
          refetch
        }
      } = this.props


      await editOrCreateDetail({
        variables: {
          detailId,
          removeAdditionalImageIds: [removeAdditionalImageId]
        }
      })

      await refetch()

      this.setState({
        snackId: Math.random(),
        snackMessage: "Additional Detail Image Removed"
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  debounce = (func) => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(
      func,
      2000
    )
  }

  saveGeometry = async (geometry) => {
    try {
      const {
        props: {
          editOrCreateDetail,
          detailId,
        },
      } = this

      await editOrCreateDetail({
        variables: {
          detailId,
          geometry
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }


  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleAdditionalImageSave = async (newAdditionalImageId) => {
    try {
      const {
        detailId,
        editOrCreateDetail,
        data: {
          refetch
        }
      } = this.props


      await editOrCreateDetail({
        variables: {
          detailId,
          newAdditionalImageIds: [newAdditionalImageId]
        }
      })

      await refetch()

      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Additional Detail Image Added"
      })

    } catch (ex) {
      console.error(ex)
    }
  }


  save = async () => {
    try {
      console.log("saving")
      const {
        props: {
          editOrCreateDetail,
          detailId,
        },
        state: {
          title,
          description
        }
      } = this


      await editOrCreateDetail({
        variables: {
          detailId,
          title,
          description
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleImageSave = async(imageId) => {
    try {
      const {
        props: {
          editOrCreateDetail,
          detailId
        }
      } = this
      await editOrCreateDetail({
        variables: {
          detailId,
          imageId
        }
      })

      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Detail Image Changed"
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  openImageModal = () => this.setState({imageModal: true})


  deleteDetail = async () => {
    try {
      const {
        detailId,
        deleteDetail,
        data: {
          refetch
        }
      } = this.props

      this.setState({deleteModal: false})

      await deleteDetail({
        variables: {
          detailId
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }




}


const ZoomerContainer = styled.div`
  width: 100%;
  display: flex;
  height: 500px;
`
