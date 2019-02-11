import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import {Row, Col, Input} from 'react-materialize'
import SnippetContainer from './Containers/SnippetContainer'
import Login from './Components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  state={
    snippets: [],
    userSnippets: [],
    snippetForm: {
      name: '',
      html: '',
      css: '',
      user_id: '',
      tags: ''
    },
    authenticated: false,
    loginToggled: true,
    loginUsername: {username: '', image: ''},
    currentuser: null,
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
            user_id: '',
            tags: ''
          }
        },()=>{document.querySelector('.btn.waves-effect.waves-light.btn-flat.modal-action.modal-close').click()})
      })
    })


  }
  toggleLoginForm = e => {
    this.setState({loginUsername: {username: '', image: ''}},() => {
      this.setState(prevState => {
        return {loginToggled: !prevState.loginToggled}
      })
    })
  }

  handleChange = e => {
    e.persist()
    this.setState(prevState=>{
      return {snippetForm: {...prevState.snippetForm, [e.target.id]:e.target.value}}
    })
  }

  handleLoginUsername = e => {
    e.persist()
    if(e.target.id==="username"){
      this.setState(prevState =>
        {
          return {loginUsername: {...prevState.loginUsername, username: e.target.value}}
        }
      )
    }else if(e.target.id==="user_image"){
      this.setState(prevState =>
        {
          return {loginUsername: {...prevState.loginUsername, image: e.target.value}}
        }
      )
    }
  }

  signIn = (e) => {
    fetch('http://localhost:9000/api/v1/login', {
      method: 'POST',
      headers:
      {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUsername.username
      })
    })
    .then(r=>r.json())
    .then(r=> {
      console.log(r)
      this.setState({ authenticated: r.success, currentuser: r.user, userSnippets: r.snippets})
    })
  }

  handleRegister = (e) => {
    fetch('http://localhost:9000/api/v1/users', {
      method: 'POST',
      headers:
      {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUsername.username,
        user_image: this.state.loginUsername.image
      })
    })
    .then(r=>r.json())
    .then(r=> {
        this.setState({ authenticated: r.success, currentuser: r.user, userSnippets: r.snippets})
      })
    }

  render() {

    return (
      <Router>
        <div className="App">
          <Header currentuser={this.state.currentuser} handleRegister={this.handleRegister} signIn={this.signIn} handleLoginUsername={this.handleLoginUsername} loginUsername={this.state.loginUsername} loginToggled={this.state.loginToggled} authenticated={this.state.authenticated} toggleLoginForm={this.toggleLoginForm} snippetForm={this.state.snippetForm} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          <Row>
            <Col s={10} offset={'s1'}>
              {this.state.authenticated && <Route
                exact path='/'
                render={() => <SnippetContainer snippets={this.state.snippets} />}
              />}
              {!this.state.authenticated && <Route
                exact path='/'
                render={() => <div>hello</div>}
              />}
              {this.state.authenticated && <Route
                exact path='/user'
                render={() => <SnippetContainer snippets={this.state.userSnippets} />}
              />}
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

export default App;
