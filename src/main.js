import React, {Component} from 'react';
import {
  Route
} from 'react-router-dom';
import './App.css';
import logo from "../public/logo.svg";
import Result from './result.js';
import Form from './form.js';

class Main extends Component {
  render() {
    return (
      <div className="app container">
        <div className="header">
          <img id="logo" src={logo}/>
        </div>
        <div className="side1"></div>
        <div className="content">
          <Form/>
        </div>
        <div className="side2"></div>

        <div>
          <Result/> 
        </div>

        <div className="footer"/>
      </div>
    );
  }
}

export default Main;
