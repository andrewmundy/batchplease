import React, {Component} from 'react';
import './App.css';
import logo from "../public/logo.svg";
import Form from './form.js';

class Main extends Component {
  render() {
    return (
      <div className="app container">
        <div className="header">
          <img alt="logo" id="logo" src={logo}/>
        </div>
        <div className="side1"></div>
        <div className="content">
          <Form/>
        </div>
        <div className="side2"></div>

        <div className="footer"/>
      </div>
    );
  }
}

export default Main;
