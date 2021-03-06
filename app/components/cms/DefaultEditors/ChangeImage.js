import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Label} from '../../ui/forms'
import Modal from '../../ui/modal'
import ImageManager from '../ImageManager'
import Image from '../../shared/Image'
import router from 'next/router'

export default class ChangeImage extends Component {

  state = {
    modal: false,
    subdomain: 'local'
  }


  render(){

    const {
      handleModalOpen,
      handleModalClose,
      props: {
        value,
        label,
      },
      handleChange,
      state: {
        modal,
        subdomain
      }
    } = this


    return (
      <Container>

        <Label>
          {label}
        </Label>
        {(value) ? (
          <Image
            imageId={value}
            height={"50px"}
          />
        ): null}

        <Button
          onClick={handleModalOpen}
        >
          Change
        </Button>



        <Modal
          open={modal}
          onClose={handleModalClose}
          header={`Edit Image`}
          width={"60%"}

        >
          <ImageManager
            subdomain={subdomain}
            onImageSave={handleChange}
          />

        </Modal>
      </Container>
    )
  }


  componentDidMount(){
    this.setState({subdomain: router.router.query.subdomain})
  }

  handleModalOpen = () => {
    this.setState({
      modal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modal: false
    })
  }

  handleChange = (imageId) => {

    const {
      onChange,
      name
    } = this.props

    onChange({
      target: {
        value: imageId,
        name
      }
    })
    this.setState({modal: false})
  }


}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  min-height: 200px;
`
