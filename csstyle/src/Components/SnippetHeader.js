import React from 'react'
import {Chip, Row, Col} from 'react-materialize'

const SnippetHeader = ({snippet}) => {
  return (
    <Row>
      <Col s={12}>
        <Chip >
          <img src={snippet.user.user_image} alt='Contact Person' />
          {snippet.user.username}
        </Chip>
        {snippet.tags.map(tag=>{
            return <Chip key={tag.id}>{tag.tag_name}</Chip>
        })}
      </Col>
    </Row>
  )
}

export default SnippetHeader
