import React, {Component} from 'react';
import './App.css';
import logo from "../public/logo.svg";
import Form from './form.js';
import response from '../response.json';
import cocktail from '../public/cocktail.svg';

class Main extends Component {
  render() {
    return (
      <div className="app container">
        <div className="header">
          <img alt="logo" id="logo" src={logo}/>
        </div>
        <div className="side1"></div>
        <div className="content">
          <Form ref="shadow"/>
          {/*
            <button onClick={() => this.refs.shadow.shadown()}></button>
            */}
          <div className="small">{{response}.response.response[Math.ceil(Math.random()*11)]}</div>
        </div>
        <div className="side2"></div>
        <div className="footer">
          {/*<img className="drinks" src={cocktail}/>*/}
        </div>
      </div>
    );
  }
}

export default Main;
