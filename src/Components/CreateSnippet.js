import React from 'react'
import {Input, Col, Button, Row} from 'react-materialize'


const CreateSnippet = ({handleSubmit, handleChange, snippetForm})=>{

  return (

        <form onSubmit={handleSubmit}>
          <Row>
            <Col s={12}>
              <Input onChange={handleChange} s={12} label="Snippet Name" value={snippetForm.name} id="name" />
            </Col>
            <Col s={12}>
              <Input onChange={handleChange} label="Comma seperated tags" s={12} value={snippetForm.tags} id="tags"/>
            </Col>
            <Col s={12}>
              <Input onChange={handleChange} type="textarea" label="HTML" s={12} value={snippetForm.html} id="html"/>
            </Col>
            <Col s={12}>
              <Input onChange={handleChange} type="textarea" label="CSS" value={snippetForm.css} s={12} id="css"/>
            </Col>
          </Row>
          <Row>
          <Col s={12}>
            <Button waves='purple'>Create Snippet</Button>
          </Col>
          </Row>
        </form>

  )
}

export default CreateSnippet;
