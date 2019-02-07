import React from 'react'
import {Tag, Chip, Row, Col} from 'react-materialize'

const SnippetHeader = ({snippet}) => {

  return (
    <Row>
      <Col s={12}>
        <Chip >
          <img src='https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' alt='Contact Person' />
          {snippet.user.username}
        </Chip>
        <Chip>{snippet.name}</Chip>
        <Chip>{snippet.html}</Chip>
        <Chip>{snippet.css}</Chip>
      </Col>
    </Row>
  )
}
export default SnippetHeader
