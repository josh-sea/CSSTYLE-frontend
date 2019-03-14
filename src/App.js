import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import {Row, Col} from 'react-materialize'
import SnippetContainer from './Containers/SnippetContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SnippetView from './Components/SnippetView'

const BASEURL = 'http://localhost:9000/';

class App extends Component {
  state={
    snippets: [],
    userSnippets: [],
    styleSheet: {filename: ''},
    selectedSnippet: {},
    searchValue: '',
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
    fetch(`${BASEURL}/api/v1/snippets`)
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
    fetch(`${BASEURL}/api/v1/snippets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({...this.state.snippetForm, user_id: this.state.currentuser.id})
    })
    .then(r=>r.json())
    .then(data => {
      this.setState(prevState=>{
        return {snippets: [data, ...prevState.snippets], userSnippets: [data, ...prevState.userSnippets] }
      }, () => {
        this.setState({
          snippetForm: {
            name: '',
            html: '',
            css: '',
            user_id: '',
            tags: ''
          }
        },()=>{
          document.querySelector('.btn.waves-effect.waves-light.btn-flat.modal-action.modal-close').click()})
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
    fetch(`${BASEURL}/api/v1/login`, {
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
      this.setState({ authenticated: r.success, currentuser: r.user, userSnippets: r.snippets})
    })
  }

  handleRegister = (e) => {
    fetch(`${BASEURL}/api/v1/users`, {
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

    handleSnippetSelect = e => {
      const selectedSnippet = this.state.snippets.find(snippet =>{
        return snippet.id === e.target.snippetId
      })
      this.setState({selectedSnippet})
    }

    updateSnippet = (response) =>{
      const snippets = this.state.snippets.map(snippet=>{
        if(snippet.id === response.id){
          return response
        } else {
          return snippet
        }
      })
      this.setState({snippets})
      const userSnippets = this.state.userSnippets.map(snippet=>{
        if(snippet.id === response.id){
          return response
        } else {
          return snippet
        }
      })
      this.setState({userSnippets})
    }

    deleteSnippet = (response) => {
      const snippets = this.state.snippets.filter(snippet=>{
        if(snippet.id === response.id){
          return false
        } else {
          return true
        }
      })
      this.setState({snippets})
      const userSnippets = this.state.userSnippets.filter(snippet=>{
        if(snippet.id === response.id){
          return false
        } else {
          return true
        }
      })
      this.setState({userSnippets})
    }

    handleKeyPress = e => {
      if (e.charCode === 13){
        this.signIn()
      }
    }

    handleLogOut= e => {
      this.setState({
        userSnippets: [],
        selectedSnippet: {},
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
      })
    }

    handleSearch = e => {
      this.setState({searchValue: e.target.value})
    }

    filterSnippets = (snippets) => {
      if (this.state.searchValue===""){
        return snippets
      }
      return snippets.filter(snippet=>{
        return snippet.tags.map(tag => tag.tag_name.toLowerCase().includes(this.state.searchValue.toLowerCase())).includes(true)
      })
    }

    clickTag = (e) => {
      e.target.parentNode.click()
      document.getElementById('search').focus()
      this.setState({searchValue: e.target.innerHTML})
    }

    generateStyleSheet = e => {
      fetch(`${BASEURL}/api/v1/snippets/${e.target.id}`)
      .then(r=>r.json())
      .then(styleSheet=>{
        this.setState({styleSheet})
      })
    }

    downloadCSS = e => {
      e.persist()
      fetch(`${BASEURL}/api/v1/snippets/${e.target.id}/stylesheet`)
      .then(r=>r.json())
      .then(data=>{
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([data.css], {type: 'text/css'}));
        a.download = `snippet_${e.target.id}.css`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
    }


  render() {

    return (
      <Router>
        <div className="App">
          <Header handleKeyPress={this.handleKeyPress} handleLogOut={this.handleLogOut} currentuser={this.state.currentuser} handleRegister={this.handleRegister} signIn={this.signIn} handleLoginUsername={this.handleLoginUsername} loginUsername={this.state.loginUsername} loginToggled={this.state.loginToggled} authenticated={this.state.authenticated} toggleLoginForm={this.toggleLoginForm} snippetForm={this.state.snippetForm} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          <Row>
            <Col s={10} offset={'s1'}>
              <Route
                exact path='/'
                render={() => <SnippetContainer clickTag={this.clickTag} searchValue={this.state.searchValue} handleSearch={this.handleSearch} deleteSnippet={this.deleteSnippet} updateSnippet={this.updateSnippet} snippets={this.filterSnippets(this.state.snippets)} />}
              />
              {this.state.authenticated && <Route
                exact path='/user'
                render={() => <SnippetContainer clickTag={this.clickTag} searchValue={this.state.searchValue} handleSearch={this.handleSearch} deleteSnippet={this.deleteSnippet} updateSnippet={this.updateSnippet} snippets={this.filterSnippets(this.state.userSnippets)} user={this.state.currentuser} />}
              />}
              <Route
                exact path='/snippet/:id'
                render={props => <SnippetView downloadCSS={this.downloadCSS} styleSheet={this.state.styleSheet} generateStyleSheet={this.generateStyleSheet} snippets={this.state.snippets} snippetId={parseInt(props.match.params.id)}/>}
              />
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

export default App;
