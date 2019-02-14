import React from 'react'
import { Row, Col, Button, Input, Modal } from 'react-materialize'
import Iframe from 'react-iframe'
const BASEURL = 'http://localhost:9000/';

const SnippetView = ({styleSheet, snippetId, snippets, generateStyleSheet}) => {
  const div = {
    height: '33vh',
    width: '100%',
    padding: '5%',
    background: 'rgb(48,48,48)',
    border: '3px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
  }

  const bottomDiv = {
    height: '72vh',
    width: '100%',
    marginTop: '5%',
    background: 'white',
    border: '5px solid teal',
    color: 'white',
    borderRadius: '12px',
    overflow: 'scroll',
    resize: 'both',
}

  const foundSnippet = () => {
    return snippets.find(snip =>{
      return snip.id === snippetId
    })
  }

  const copyPasta = (e) => {
    const cutText = document.getElementById("copy-text");
    cutText.select();
    document.execCommand("copy");
    window.Materialize.toast('Copied!', 3000);
  }
  const downloadCSS = e => {
          const a = window.document.createElement('a');
          a.href = window.URL.createObjectURL(new Blob([foundSnippet().css], {type: 'text/css'}));
          a.download = `snippet_${snippetId}.css`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }

    return (
      <div>
        <Modal
        id='bottom-modal'
          header={`Stylesheet for your Snippet`}
          bottomSheet
          trigger={<Button>Get Stylesheet</Button>}>
          <Row>
            <Col s={6}>
              <Input s={12} id="copy-text"  placeholder='Style Sheet' value={styleSheet.filename} />
            </Col>
            </Row>
            <Row>
              <Col s={3}>
                <Button id={snippetId} onClick={generateStyleSheet}>Generate Stylesheet</Button>
              </Col>
              <Col s={3}>
                <Button onClick={copyPasta}>Copy Link</Button>
              </Col>
            <Col s={3} offset={'s3'}>
              <Button id={snippetId} onClick={downloadCSS}>Download Stylesheet</Button>
            </Col>
            </Row>
        </Modal>
      <Row>
        <Col s={6}>
          <Row>
          <h6>HTML</h6>
          <div style={div}>
            {
            (snippets.length>0) && foundSnippet().html
            }
          </div>
          </Row>
          <Row>
          <h6>CSS</h6>
            <div style={div}>
            {
            (snippets.length>0) && foundSnippet().css
            }
            </div>
          </Row>
        </Col>
        <Col s={6}>
          <div style={bottomDiv}>
          <Iframe url={`${BASEURL}/api/v1/render/${snippetId}?height=whatever&width=whatever`}
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
        <Row>
        <Col s={6}>

        </Col>


      </Row>
      </div>

    )
}

export default SnippetView;
