import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components'

const WelcomeWrapper = styled.div`
  width: 50%;
  text-align: center;
  margin: 0 auto !important;
  background: #A3CEF1 !important; 
`

const Welcome = (props) => {
  return (
    <Segment basic className='container'>
      <Segment as={WelcomeWrapper}>
        <Header as='h1'>Welcome to Logophile!</Header>
        <Header as="h2">Keep track of your book archives </Header>
        <Header as='h3'>Search for a book using the search-bar above</Header>
        <p>You can select a book, preview, and add to your bookshelf</p>
        <p>Navigate to the library to create new bookshelves</p>
      </Segment>
    </Segment>
  )
}

export default Welcome;
