import React, { Component } from 'react';
import {CollapsibleItem, CardPanel, Row, Col, Button} from 'react-materialize'
import SnippetHeader from './SnippetHeader'
import { Link } from 'react-router-dom'
import ContentEditable from 'react-contenteditable'


export default class Snippet extends Component {
  escapeHtml = (unsafe) => {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  unescapeHtml = (safe) => {
    return safe.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  }

  state={
    snippetHTML: this.props.snippet.html,
    snippetCSS: this.props.snippet.css
  }

  handleChange= (event) => {
    if (event.currentTarget.className.includes("snippethtml")){
      this.setState({
        snippetHTML: event.target.value
      })
    }else{
      this.setState({
        snippetCSS: event.target.value
      })
    }
  }

  handleSubmit=()=>{
    fetch(`http://localhost:9000/api/v1/snippets/${this.props.snippet.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        html: this.unescapeHtml(this.state.snippetHTML),
        css: this.state.snippetCSS
      })
    })
    .then(r=>r.json())
    .then(console.log)
  }


  render(){

    return(
      <CollapsibleItem onSelect={()=>{}} header={<SnippetHeader snippet={this.props.snippet}/>}>
        {!this.props.user &&
          <Row>
            <Col s={4} offset={'s2'}>
              <CardPanel className="blue lighten-4 black-text show-code">
                <code className="codebox">{this.props.snippet.html}</code>
              </CardPanel>
            </Col>
            <Col s={4}>
              <CardPanel className="yellow lighten-4 black-text show-code">
                <code className="codebox">{this.props.snippet.css}</code>
              </CardPanel>
            </Col>
          </Row>
          }
          {this.props.user &&
            <Row>
              <Col s={4} offset={'s2'}>
                <CardPanel className="blue lighten-4 black-text show-code">
                  <ContentEditable
                    html={this.escapeHtml(this.state.snippetHTML)} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    tagName='code' // Use a custom HTML tag (uses a div by default)
                    className='codebox snippethtml'
                    onChange={this.handleChange}
                  />
                </CardPanel>
              </Col>
              <Col s={4}>
                <CardPanel className="yellow lighten-4 black-text show-code">
                  <ContentEditable
                    html={this.state.snippetCSS} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    tagName='code' // Use a custom HTML tag (uses a div by default)
                    className='codebox snippetcss'
                    onChange={this.handleChange}
                  />
                </CardPanel>
              </Col>
            </Row>
          }
          <Link to={`/snippet/${this.props.snippet.id}`}>
            <Button icon='mode_edit'>View</Button>
          </Link>
        <Button onClick={this.handleSubmit}>Save</Button>
      </CollapsibleItem>
    )
  }
}
