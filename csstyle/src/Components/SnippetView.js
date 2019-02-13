import React from 'react'
import { Row, Col } from 'react-materialize'
import Iframe from 'react-iframe'


const SnippetView = ({snippetId, snippets}) => {
  const div = {
    height: '40vh',
    width: '100%',
    padding: '5%',
    background: 'rgb(48,48,48)',
    border: '3px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
  }

  const bottomDiv = {
    height: '40vh',
    width: '100%',
    marginTop: '2%',
    background: 'white',
    border: '5px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
    resize: 'both',
}

  const foundSnippet = () => {
    let returnSnip = snippets.find(snip =>{
      return snip.id === snippetId
    })
    return returnSnip
  }
    return (
      <Row>
        <Col s={6}>
          <div style={div}>
            {
            (snippets.length>0) && foundSnippet().html
            }
          </div>
        </Col>
        <Col s={6}>
          <div style={div}>
          {
          (snippets.length>0) && foundSnippet().css
          }
          </div>
        </Col>
        <Col s={12}>
          <div style={bottomDiv}>
          <Iframe url={`http://localhost:9000/api/v1/render/${snippetId}?height=whatever&width=whatever`}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen>
          </Iframe>
          </div>
        </Col>

      </Row>


    )
}

export default SnippetView;
