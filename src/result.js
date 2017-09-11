import React, {Component} from 'react';
import './App.css';
import Form from './form.js'

class Result extends Component {
  render(){
    console.log(this.props)
    return(
      <div className="">
        {this.props.drinkCount}
      </div>
    )
  }
};

export default Result;
