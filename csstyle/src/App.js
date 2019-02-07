import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import SnippetContainer from './Containers/SnippetContainer'
import {Button, Icon} from 'react-materialize'


class App extends Component {
  state={
    snippets: [],
    snippetForm: {
      name: '',
      html: '',
      css: '',
      user_id: ''
    },
  }

  componentDidMount(){
    fetch("http://localhost:9000/api/v1/snippets")
    .then(r=>r.json())
    .then(data=>{
      this.setState({
        snippets: data
      })
    })
  }

  handleSubmit = e => {
    e.persist()
    e.preventDefault()
    fetch("http://localhost:9000/api/v1/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state.snippetForm)
    })
    .then(r=>r.json())
    .then(data => {
      this.setState(prevState=>{
        return {snippets: [data, ...prevState.snippets]}
      }, () => {
        this.setState({
          snippetForm: {
            name: '',
            html: '',
            css: '',
            user_id: ''
          }
        })
      })
    })


  }

  handleChange = e => {
    e.persist()
    this.setState(prevState=>{
      return {snippetForm: {...prevState.snippetForm, [e.target.id]:e.target.value}}
    })
  }

  render() {

    return (
      <div className="App">
        <Header snippetForm={this.state.snippetForm} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <SnippetContainer snippets={this.state.snippets}/>
      </div>
    );
  }
}

export default App;
