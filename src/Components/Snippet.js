import React, { Component } from 'react';
import {CollapsibleItem, CardPanel, Row, Col, Button} from 'react-materialize'
import SnippetHeader from './SnippetHeader'
import { Link } from 'react-router-dom'
import ContentEditable from 'react-contenteditable'
const BASEURL = 'http://localhost:9000/';

export default class Snippet extends Component {
  escapeHtml = (unsafe) => {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/ /g, "&nbsp;")
  }
  unescapeHtml = (safe) => {
    return safe.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")
  }

  state={
    snippetHTML: this.escapeHtml(this.props.snippet.html),
    snippetCSS: this.props.snippet.css
  }

  removeBr = (input) => {
    return input.replace(/<br>/g, "\n")
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
    fetch(`${BASEURL}/api/v1/snippets/${this.props.snippet.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        html: this.unescapeHtml(this.state.snippetHTML),
        css: this.unescapeHtml(this.state.snippetCSS)
      })
    })
    .then(r=>r.json())
    .then(r=>this.props.updateSnippet(r))
  }

  handleDelete=()=>{
    fetch(`${BASEURL}/api/v1/snippets/${this.props.snippet.id}`, {
      method: 'DELETE'
    })
    .then(r=>r.json())
    .then(r=>this.props.deleteSnippet(r))
  }

  handleTab=(e)=>{
    if(e.keyCode===9){
      document.execCommand('insertHTML', false, '\u00a0\u00a0\u00a0\u00a0');
      e.preventDefault();
    }
  }

  slicer = (input) => {
    const slicedInput=input.slice(0,100);
    if (slicedInput.length<input.length){
      return slicedInput+"..."
    }else{
      return input
    }
  }

  render(){

    return(
      <CollapsibleItem onSelect={()=>{}} header={<SnippetHeader clickTag={this.props.clickTag} snippet={this.props.snippet}/>}>
        {!this.props.user &&
          <Row>
            <Col s={6}>
              <h5 style={{margin: 'none'}}>HTML</h5>
              <CardPanel style={controlOverflow} className="blue lighten-4 black-text show-code">
                <code className="codebox">{this.slicer(this.props.snippet.html)}</code>
              </CardPanel>
            </Col>
            <Col s={6}>
              <h5 style={{margin: 'none'}}>CSS</h5>
              <CardPanel style={controlOverflow} className="yellow lighten-4 black-text show-code">
                <code className="codebox">{this.slicer(this.props.snippet.css)}</code>
              </CardPanel>
            </Col>
          </Row>
          }
          {this.props.user &&
            <Row>
              <Col s={6}>
                <h5 style={{margin: 'none'}}>HTML</h5>
                <CardPanel style={controlOverflow} className="blue lighten-4 black-text show-code">
                  <ContentEditable
                    html={this.state.snippetHTML} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    tagName='code' // Use a custom HTML tag (uses a div by default)
                    className='codebox snippethtml'
                    onChange={this.handleChange}
                    onKeyDown={this.handleTab}
                  />
                </CardPanel>
              </Col>
              <Col s={6}>
                <h5 style={{margin: 'none'}}>CSS</h5>
                <CardPanel style={controlOverflow} className="yellow lighten-4 black-text show-code">
                  <ContentEditable
                    html={this.state.snippetCSS} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    tagName='code' // Use a custom HTML tag (uses a div by default)
                    className='codebox snippetcss'
                    onChange={this.handleChange}
                    onKeyDown={this.handleTab}
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
  textAlign: 'left',
  overflow: 'scroll',
  maxHeight: '50vh',
  resize: 'both',
}
