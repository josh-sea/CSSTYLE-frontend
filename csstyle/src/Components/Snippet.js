import React, { Component } from 'react';
import {CollapsibleItem, CardPanel, Row, Col, Button} from 'react-materialize'
import SnippetHeader from './SnippetHeader'
import { Link } from 'react-router-dom'
import ContentEditable from 'react-contenteditable'

export default class Snippet extends Component {
  escapeHtml = (unsafe) => {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/<br>/, "")
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
    .then(r=>this.props.updateSnippet(r))
  }

  handleDelete=()=>{
    fetch(`http://localhost:9000/api/v1/snippets/${this.props.snippet.id}`, {
      method: 'DELETE'
    })
    .then(r=>r.json())
    .then(r=>this.props.deleteSnippet(r))
  }

  render(){

    return(
      <CollapsibleItem onSelect={()=>{}} header={<SnippetHeader snippet={this.props.snippet}/>}>
        {!this.props.user &&
          <Row>
            <Col s={6}>
              <h5 style={{margin: 'none'}}>HTML</h5>
              <CardPanel className="blue lighten-4 black-text show-code">
                <code className="codebox">{this.props.snippet.html}</code>
              </CardPanel>
            </Col>
            <Col s={6}>
              <h5 style={{margin: 'none'}}>CSS</h5>
              <CardPanel className="yellow lighten-4 black-text show-code">
                <code className="codebox">{this.props.snippet.css}</code>
              </CardPanel>
            </Col>
          </Row>
          }
          {this.props.user &&
            <Row>
              <Col s={4} offset={'s2'}>
                <h5 style={{margin: 'none'}}>HTML</h5>
                <CardPanel style={controlOverflow} className="blue lighten-4 black-text show-code">
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
                <h5 style={{margin: 'none'}}>CSS</h5>
                <CardPanel style={controlOverflow} className="yellow lighten-4 black-text show-code">
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
            <Button>View</Button>
          </Link>
        {this.props.user && <Button waves='purple' onClick={this.handleSubmit}>Save</Button>}
        {this.props.user && <Button waves='purple' onClick={this.handleDelete}>Delete</Button>}
      </CollapsibleItem>
    )
  }
}

const controlOverflow ={
  overflow: 'scroll',
}
