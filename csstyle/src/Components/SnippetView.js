import React from 'react'
import { Row, Col } from 'react-materialize'


const SnippetView = ({snippetId, snippets}) => {
  const div = {
    height: '100%',
    width: '100%',
    background: '#333',
    border: '5px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
  }

  const bottomDiv = {
    width: '100%',
    hieght: '50%',
    marginTop: '2%',
    background: '#333',
    border: '5px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
  }

  const foundSnippet = () => {
    return snippets.find(snip =>{
      return snip.id === snippetId
    })
  }
//console.log(snippet);
    return (
      <Row>
        <Col s={6}>
          <div style={div}>
            {
            foundSnippet().html
            }
          </div>
        </Col>
        <Col s={6}>
          <div style={div}>
          {
          foundSnippet().css
          }
          </div>
        </Col>
        <Col s={12}>
          <div style={bottomDiv}>
          </div>
        </Col>
      </Row>


    )
}

export default SnippetView;
