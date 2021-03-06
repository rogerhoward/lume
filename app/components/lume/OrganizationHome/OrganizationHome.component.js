import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../ui/search'
import {Button} from '../../ui/buttons'
import Link from 'next/link'
import Image from '../../shared/Image'
import {Label, Checkbox} from '../../ui/forms'
import Router from 'next/router'
import {H3, H2, H4} from '../../ui/h'
import {Column, Row} from '../../ui/layout'

export default class Home extends Component {


  constructor(props){
    super(props)

    const {
      search,
      template
    } = this.props.router.query

    this.state = {
      search: search || "",
      template: template ? template.split(',') : ["original","slider"],
      selectedGroupIds: []
    }
  }

  render() {

    if (!this.props.stories || !this.props.organization) return null

    const {
      props: {
        stories,
        router: {
          query: {
            subdomain
          }
        },
        organization
      },
      state: {
        search,
        template,
        selectedGroupIds
      },
      searchChange,
      handleCheck,
      handleGroupCheck,
      handleLoadMore,
      handleScroll,
      handleEnter
    } = this

    return (

      <Container>
        <SideBar>

          <H2>Art Stories</H2>

          <SearchRow>
            <Search
              name={"search"}
              value={search}
              onChange={searchChange}
              onKeyPress={handleEnter}
            />
          </SearchRow>

          <Options>

            <H3>
              Story Type
            </H3>

            <Checkbox
              name={"original"}
              checked={template.includes("original")}
              label={"Object Stories"}
              onChange={handleCheck}
            />

            <Checkbox
              name={"slider"}
              checked={template.includes("slider")}
              label={"Thematic Stories"}
              onChange={handleCheck}
            />

            {organization.categories.map( category => (
              <Column
                key={category.id}
              >
                <H3>
                  {category.title}
                </H3>
                {category.groups.map( group => (
                  <Row
                    key={group.id}
                  >
                    <Checkbox
                      name={"selectedGroups"}
                      value={group.id}
                      checked={selectedGroupIds.includes(group.id)}
                      onChange={handleGroupCheck}
                    />
                    {group.title}
                  </Row>
                ))}
              </Column>
            ))}

          </Options>
        </SideBar>
        <Results
          id={'results'}
          onScroll={handleScroll}
        >
          {stories.map( ({id, previewImage, title}) => (
            <Story
              key={id}
              id={id}
              imageId={(previewImage) ? previewImage.id : undefined}
              subdomain={subdomain}
              title={title}
            />
          ))}
          <MoreRow>
            {(
              stories.length % 30 === 0 && stories.length > 0) ? (
              <Button
                onClick={handleLoadMore}
              >
                More
              </Button>
            ): null}
            {(stories.length === 0) ? (
              <H3>
                No stories match that search
              </H3>
            ): null}
          </MoreRow>


        </Results>

      </Container>
    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  handleEnter = ({keyCode}) => {
    if (keyCode === 0){
      this.updateUrl()
    }
  }

  searchChange = ({target: {name, value}}) => {
    this.setState(
      ()=>({[name]: value}),
      ()=>{
        this.debounce(this.updateUrl,2000)
      }
    )
  }

  handleGroupCheck = ({target: {checked, name, value}}) => {
    this.setState(
      ({selectedGroupIds}) => {
        let groups = selectedGroupIds.slice()
        if (
          groups.includes(value)
        ) {
          groups = groups.filter(id => id !== value)
          return {
            selectedGroupIds:groups
          }
        } else {
          groups.push(value)
          return {
            selectedGroupIds: groups
          }
        }
      },
      this.updateUrl
    )
  }

  handleCheck = ({target: {checked, name}}) => {
    this.setState(
      (prevState) => {
        let template = prevState.template.slice()
        if (
          checked &&
          !template.includes(name)
        ) {
          template.push(name)
        } else if(
          !checked &&
          template.includes(name)
        ) {
          template = template.filter( val => val !== name )
        }

        return {
          template
        }
      },
      this.updateUrl
    )
  }


  updateUrl = () => {

    const {
      subdomain
    } = this.props.router.query

    const {
      search,
      template,
      selectedGroupIds: groups
    } = this.state

    let queries = {
      search,
      template,
      groups
    }

    let queryString = `/${subdomain}?`

    for (let key in queries) {
      queryString = queryString.concat(`${key}=${queries[key]}&`)
    }



    this.props.router.replace(
      {
        pathname: "/lume",
        query: {
          search,
          subdomain,
          template: template.join(','),
          groups: groups.join(',')
        }
      },
      queryString,
      {shallow: true}
    )
  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          fetchMore,
          stories,
          variables,
        },
      } = this

      if (
        stories.length % 30 === 0
        && stories.length > 0
      ) {
        let newVariables = {
          filter: {
            ...variables.filter,
            offset: this.props.stories.length,
          }
        }

        fetchMore({
          variables: newVariables,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult }

            return Object.assign({}, previousResult, {
              stories: [...previousResult.stories, ...fetchMoreResult.stories]
            })
          },
        })
      }


    } catch (ex) {
      console.error(ex)
    }
  }

  handleScroll = () => {
    this.debounce(
      () => {
        let results = document.getElementById('results')

        if (
          results.scrollTop + results.clientHeight >= results.scrollHeight - 300
        ) {
          this.handleLoadMore()
        }
      },
      1000
    )
  }

}

const Story = ({id, imageId, subdomain, title}) => (
  <Link
    href={{
      pathname: '/lume/story',
      query: {
        storyId: id,
        subdomain
      }
    }}
    as={`/${subdomain}/story/${id}`}
  >
    <AWrap>

    {(imageId) ? (
      <Image
        imageId={imageId}
        width={"100%"}
        objectFit={"cover"}
        title={title}
      />
    ): (
      <div
        style={{
          width: '100%',
          border: '1px solid grey'
        }}
      >
        <H4>{title}</H4>
      </div>
    )}
  </AWrap>

  </Link>
)

const AWrap = styled.a`
  cursor: pointer;
  display: flex;
  height: 200px;
  width: 300px;
  margin: 10px 10px;
`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
`

const Results = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  overflow-y: scroll;
`

const MoreRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px;
`

const SideBar = styled.div`
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  padding: 30px;
`

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`
