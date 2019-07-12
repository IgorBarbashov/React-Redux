import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Context from './context/content';
import PathTree from "./components/pathtree/pathtree";
import AdminPanel from "./components/adminpanel/adminpanel";
import PageContent from "./components/pagecontent/pagecontent";
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.SERVER_URL = [
      "http://185.158.153.91:1322",
      "https://strapi-server.herokuapp.com"
    ];
    
    this.state = {
      isAuth: false,
      jwt: undefined,
      authuser: undefined,
      pagesList: [],
      serverIndex: 1
    }

  }

  componentDidMount() {
    if (window.sessionStorage) {
      let ssjwt = sessionStorage.getItem("jwt");
      if (ssjwt) {
        let ssauthuser = JSON.parse( sessionStorage.getItem("authuser") );
        this.setState({jwt: ssjwt, authuser: ssauthuser, isAuth: true});
      }
      let ssserverIndex = sessionStorage.getItem("serverIndex");
      if (ssserverIndex !== null) {
        console.log(ssserverIndex);
        this.setState({serverIndex: +ssserverIndex}, this.getPagesList);
        return;
      }
    }
    this.getPagesList();
  }

  checkSlug = (slug, pageID) => {
    return this.state.pagesList.some( el => (el.slug === slug && (pageID === undefined || el.id !== pageID) ) );
  }

  getPagesList = () => {
    axios
      .get(this.SERVER_URL[this.state.serverIndex] + "/pages")
      .then( response => {
        this.setState( {pagesList: response.data} );
      })
      .catch(error => {
        alert("Не могу получить список страниц: " + error.response.data.statusCode + " - " + error.response.data.message);
      });
  }

  LogIn = (login, password) => {
    axios
    .post(this.SERVER_URL[this.state.serverIndex] + "/auth/local",
      {
        "identifier": login,
        "password": password,
        "rememberMe": true
      })
    .then( response => {
        sessionStorage.setItem("authuser", JSON.stringify(response.data.user) );
        sessionStorage.setItem("jwt", response.data.jwt);
        sessionStorage.setItem("isAuth", true);
        
        this.setState( {isAuth: true, jwt: response.data.jwt, authuser: response.data.user } );
      }
    )
    .catch(error => {
      alert("Не могу авторизоваться: " + error.response.data.statusCode + " - " + error.response.data.message);
    });
  }

  LogOut = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("authuser");
    sessionStorage.removeItem("isAuth");

    this.setState( {isAuth: false, jwt: undefined, authuser: undefined} );
  }
  
  deleteCRUD = (pageID) => {
    if (!this.state.isAuth) {
      alert("Вы не авторизованы");
      return;
    }
    axios
    .delete(this.SERVER_URL[this.state.serverIndex] + `/pages/${pageID}`, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}`
      }
    } )
    .then(response => {
      alert(response.status + " - " + response.statusText);
      this.getPagesList();
      }
    )
    .catch(error => {
      alert("Не могу удалить страницу: " + error.response.data.statusCode + " - " + error.response.data.message);
    });
  }

  updateCRUD = (pageID, pageData) => {
    if (!this.state.isAuth) {
      alert("Вы не авторизованы");
      return;
    }
    if (pageData.slug === "") {
      alert("Нельзя создавать страницу с пустым slug");
      return;
    }
    if (this.checkSlug(pageData.slug, pageID)) {
      alert("Страница со slug: '" + pageData.slug + "' уже существует");
      return;
    }
    axios
    .put(this.SERVER_URL[this.state.serverIndex] + `/pages/${pageID}`, pageData, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}` } }
    )
    .then(response => {
      alert(response.status + " - " + response.statusText);
      this.getPagesList();
      }
    )
    .catch(error => {
      alert("Не могу обновить страницу: " + error.response.data.statusCode + " - " + error.response.data.message);
    });
  }

  createCRUD = (newPage) => {
    if (!this.state.isAuth) {
      alert("Вы не авторизованы");
      return;
    }
    if (newPage.slug === "") {
      alert("Нельзя создавать страницу с пустым slug");
      return;
    }
    if (this.checkSlug(newPage.slug)) {
      alert("Страница со slug: '" + newPage.slug + "' уже существует");
      return;
    }
    axios
    .post(this.SERVER_URL[this.state.serverIndex] + "/pages", newPage, {
      headers: {
        Authorization: `Bearer ${this.state.jwt}` } }
    )
    .then(response => {
      alert(response.status + " - " + response.statusText);
      this.getPagesList();
      }
    )
    .catch(error => {
      alert("Не могу обновить страницу: " + error.response.data.statusCode + " - " + error.response.data.message);
    });
  }

  changeServer = (e) => {
    if (this.state.serverIndex === 0) {
      sessionStorage.setItem("serverIndex", 1);
      this.setState({serverIndex: 1}, ()=>{this.LogOut(); this.getPagesList()});
    } else {
      sessionStorage.setItem("serverIndex", 0);
      this.setState({serverIndex: 0}, ()=>{this.LogOut(); this.getPagesList()});
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">

          <Context.Provider value={{LogOut: this.LogOut, LogIn: this.LogIn, authuser: this.state.authuser }}>
            <PathTree pagesList={this.state.pagesList} isAuth={this.state.isAuth}
                getPagesList={this.getPagesList} changeServer={this.changeServer} 
                createCRUD={this.createCRUD} serverIndex={this.state.serverIndex}/>
          </Context.Provider>

          <div className="width-100">
            <Route path="/" 
              render={ props => { 
                return (
                  <>
                    { this.state.isAuth ? 
                        <Context.Provider value={{updateCRUD: this.updateCRUD, deleteCRUD: this.deleteCRUD, createCRUD: this.createCRUD}}>
                          <AdminPanel {...props} pagesList={this.state.pagesList} />
                        </Context.Provider>
                      : "" }
                    <PageContent {...props} pagesList={this.state.pagesList} />
                  </>
                ); } }
            />
          </div>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;