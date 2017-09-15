import React, {Component} from 'react';
import './App.css';
import heart from '../public/heart.svg';
import heartfl from '../public/heartfl.svg';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkCount: 1, // 1
      drinkIncrement: "Litre", // Eaches =1, Gal=128, Punch=384
      drinkName: "Margarita", //daiquiri
      inputs:5,
      fav:0,
      measurement:"oz",

      totalDrinks:4, // Eaches? "drinkCount" : drinkIncrement(gal) / totalOz
      totalOz: 448, //drinkOz(3.5) * drinkIncrement(gal=128) * drinkCount(2) = 896
      drinkOz: 3.5, // ing1 + ing2 + ing3 + ing4 + ing5 +ing6
      isPlural: false, // totalDrink > 1 ?

      "ing1grey":1.5,
      "ing1Oz": 2,
      "ing1Inc": "oz",
      "ing1Name":"Tequila",

      "ing2grey":1,
      "ing2Oz": 1,
      "ing2Inc": "oz",
      "ing2Name":"Cointreau",

      "ing3grey":1,
      "ing3Oz": 1,
      "ing3Inc": "oz",
      "ing3Name":"Lime",

      "ing4grey":1,
      "ing4Oz": 0.5,
      "ing4Inc": "oz",
      "ing4Name":"Agave",

      "ing5grey":1,
      "ing5Oz": 1,
      "ing5Inc": "dash",
      "ing5Name": "Mezcal",

      "ing6grey":1,
      "ing6Oz": 0,
      "ing6Inc": "",
      "ing6Name":"",
    }
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) { //updates form on change
    let target = e.target;
    let value = target.value;
    let name = target.name;

    let val = this.state.inputs;

    if(name === "inputs"){
      if(value === "plus"){
        if(val >= 6){
          return
        }return this.setState({
            inputs:val + 1
          });
      }else if(value === "minus"){
        if(val <= 1){
          return
        }return this.setState({
          inputs:val -1
        });
      }
    }

    if(name === "heart"){
      if(this.state.fav){
        return this.setState({
          fav:0
        });
      }else{
        return this.setState({
          fav:1
        });
      }
    };

    if(name === "oz"){
      this.setState({
        measurement:"oz"
      })
    }else if(name === "ml"){
      this.setState({
        measurement:"ml"
      })
    }else if (name === "floz") {
      this.setState({
        measurement:"floz"
      })
    }

    if(name === "checkbox"){
      let grey = `ing${value}grey`;
      if(this.state[grey]){
        return this.setState({
          [grey]:0
        });
      }else{
        return this.setState({
          [grey]:1
        });
      }
    };

    this.setState({
      [name]: value
    });
  };

  newDrink() {
    let totalDrinks = 0;
    let dashOz = 0.21;
    let plural = "";
    let newDrink = "";
    let multiplier = 0;

    if(this.state.measurement === "oz"){
      multiplier = 1;
    }else if(this.state.measurement === "floz"){
      multiplier = 1.04;
    }else if(this.state.measurement === "ml"){
      multiplier = 29.57;
    }

    let ing1 = this.state.ing1Oz;
    let ing2 = this.state.ing2Oz;
    let ing3 = this.state.ing3Oz;
    let ing4 = this.state.ing4Oz;
    let ing5 = this.state.ing5Oz;
    let ing6 = this.state.ing6Oz;

    if(this.state.ing1Inc === "dash"){
      ing1 = parseFloat((ing1 * dashOz).toFixed(1))
    }else if (this.state.ing2Inc === "dash") {
      ing2 = parseFloat((ing2 * dashOz).toFixed(1))
    }else if (this.state.ing3Inc === "dash") {
      ing3 = parseFloat((ing3 * dashOz).toFixed(1))
    }else if (this.state.ing4Inc === "dash") {
      ing4 = parseFloat((ing4 * dashOz).toFixed(1))
    }else if (this.state.ing5Inc === "dash") {
      ing5 = parseFloat((ing5 * dashOz).toFixed(1))
    }else if (this.state.ing6Inc === "dash") {
      ing6 = parseFloat((ing6 * dashOz).toFixed(1))
    }
    //DRINKOZ//
    let drinkOz =
        Number(ing1)
      + Number(ing2)
      + Number(ing3)
      + Number(ing4)
      + Number(ing5)
      + Number(ing6)

    if (this.state.drinkIncrement === "Eaches"){
      totalDrinks = this.state.drinkCount
    }else if(this.state.drinkIncrement === "Gallon"){
      totalDrinks = Math.floor((this.state.drinkCount * 128)/drinkOz)
    }else if(this.state.drinkIncrement === "Punch Bowl"){
      totalDrinks = Math.floor((this.state.drinkCount * 320)/drinkOz)
    }else if(this.state.drinkIncrement === "Litre"){
      totalDrinks = Math.floor((this.state.drinkCount * 33.81)/drinkOz)
    }

    ing1 *= totalDrinks * multiplier;
    ing2 *= totalDrinks * multiplier;
    ing3 *= totalDrinks * multiplier;
    ing4 *= totalDrinks * multiplier;
    ing5 *= totalDrinks * multiplier;
    ing6 *= totalDrinks * multiplier;

    //PLURAL
    totalDrinks > 1 ? plural = "s" : plural = "";

    newDrink = totalDrinks + " " + this.state.drinkName + plural;

    let heartQuest = heart;

    if(this.state.fav){
      heartQuest = heartfl;
    }else{
      heartQuest = heart;
    }

    return (
      <div>
        <div className="name">{newDrink} <img className="heart" alt="favorite 💕" src={heartQuest} name="heart" onClick={this.handleChange}/> </div>
        {this.results(ing1,ing2,ing3,ing4,ing5,ing6)}
      </div>
    )
  };

  isMobile(){
    if(window.innerWidth < 500){
      return "tel"
    }else{
      return "number"
    }
  }

  isHidden(x){
    let theState = this.state[`ing${x}Oz`]
    return theState ? "show" : "hidden";
  }

  isGrey(x){
    if(this.state[`ing${x}grey`]){
      return ""
    }else{
      return "grey"
    }
  }

  handleFocus(e){
    e.target.select();
  };

  increment(x){
    if(this.state.measurement === "ml"){
      return "ml"
    }else if(this.state.measurement === "floz"){
      return "floz"
    }
    if(this.state[`ing${x}Inc`] === "dash"){
      return "oz"
    }else{
      return this.state[`ing${x}Inc`]
    }
  }

  isMax(){
    if(this.state.inputs === 6){
      return "hidden"
    }
  };
  isMin(){
    if(this.state.inputs === 1){
      return "hidden"
    }
  };
  isSelected(x){
    if(this.state.measurement === x){
      return "selected"
    }
  }
  inputs(){
    let state = this.state;
    let change = this.handleChange;
    let x = this.state.inputs;
    let outputs = [];

    let one = (
      <div className="form fields">
      <input
      id="ing1Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing1Oz"
      placeholder={state.ing1Oz}
      value={state.ing1Oz}
      onChange={change}
      tabIndex="3"
      onFocus={this.handleFocus}
      />
      <select
      id="ing1Inc"
      className="select"
      name="ing1Inc"
      value={state.ing1Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing1Name"
      name="ing1Name"
      placeholder={state.ing1Name}
      value={state.ing1Name}
      onChange={change}
      tabIndex="4"
      onFocus={this.handleFocus}
      />
      </div>
    );
    let two = (
      <div className="form fields">
      <input
      id="ing2Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing2Oz"
      placeholder={state.ing2Oz}
      value={state.ing2Oz}
      onChange={change}
      tabIndex="5"
      onFocus={this.handleFocus}
      />
      <select
      id="ing2Inc"
      className="select"
      name="ing2Inc"
      value={state.ing2Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing2Name"
      name="ing2Name"
      placeholder={state.ing2Name}
      value={state.ing2Name}
      onChange={change}
      tabIndex="6"
      onFocus={this.handleFocus}
      />
      </div>
    );
    let three = (
      <div className="form fields">
      <input
      id="ing3Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing3Oz"
      placeholder={state.ing3Oz}
      value={state.ing3Oz}
      onChange={change}
      tabIndex="7"
      onFocus={this.handleFocus}
      />
      <select
      id="ing3Inc"
      className="select"
      name="ing3Inc"
      value={state.ing3Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing3Name"
      name="ing3Name"
      placeholder={state.ing3Name}
      value={state.ing3Name}
      onChange={change}
      tabIndex="8"
      onFocus={this.handleFocus}
      />
      </div>
    );
    let four = (
      <div className="form fields">
      <input
      id="ing4Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing4Oz"
      placeholder={state.ing4Oz}
      value={state.ing4Oz}
      onChange={change}
      tabIndex="9"
      onFocus={this.handleFocus}

      />
      <select
      id="ing4Inc"
      className="select"
      name="ing4Inc"
      value={state.ing4Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing4Name"
      name="ing4Name"
      placeholder={state.ing4Name}
      value={state.ing4Name}
      onChange={change}
      tabIndex="10"
      onFocus={this.handleFocus}

      />
      </div>
    );
    let five = (
      <div className="form fields">
      <input
      id="ing5Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing5Oz"
      placeholder={state.ing5Oz}
      value={state.ing5Oz}
      onChange={change}
      tabIndex="11"
      onFocus={this.handleFocus}

      />
      <select
      id="ing5Inc"
      className="select"
      name="ing5Inc"
      value={state.ing5Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing5Name"
      name="ing5Name"
      placeholder={state.ing5Name}
      value={state.ing5Name}
      onChange={change}
      tabIndex="12"
      onFocus={this.handleFocus}
      />
      </div>
    );
    let six = (
      <div className="form fields">
      <input
      id="ing6Oz"
      className="num"
      type={this.isMobile()}
      min="0"
      name="ing6Oz"
      placeholder={state.ing6Oz}
      value={state.ing6Oz}
      onChange={change}
      tabIndex="13"
      onFocus={this.handleFocus}

      />
      <select
      id="ing6Inc"
      className="select"
      name="ing6Inc"
      value={state.ing6Inc}
      onChange={change}
      >
      <option value="oz">oz</option>
      <option value="dash">dash</option>
      </select>
      <input
      id="ing6Name"
      name="ing6Name"
      placeholder={state.ing6Name}
      value={state.ing6Name}
      onChange={change}
      tabIndex="14"
      onFocus={this.handleFocus}
      />
      </div>
    );

    let arr = [[one],[two],[three],[four],[five],[six]];

    for(var i=0;i<x;i++){
      outputs.push(arr[i])
    }
    return outputs
  }

  results(ing1,ing2,ing3,ing4,ing5,ing6){
    let state = this.state;
    let x = this.state.inputs;
    let outputs = [];

    let one = (
      <div className={`result-container ${this.isGrey(1)} ${this.isHidden(1)}`}>
        <div><input id="checkbox1" type="checkbox" name="checkbox" value="1" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing1).toFixed(1))}</div>
        <div className="inc">{this.increment(1)}</div>
        <div className="ing-name">{state.ing1Name}</div>
      </div>
    );
    let two = (
      <div className={`result-container ${this.isGrey(2)} ${this.isHidden(2)}`}>
        <div><input id="checkbox2" name="checkbox" value="2" type="checkbox" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing2).toFixed(1))}</div>
        <div className="inc">{this.increment(2)}</div>
        <div className="ing-name">{state.ing2Name}</div>
      </div>
    );
    let three = (
      <div className={`result-container ${this.isGrey(3)} ${this.isHidden(3)}`}>
        <div><input id="checkbox3" name="checkbox" value="3" type="checkbox" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing3).toFixed(1))}</div>
        <div className="inc">{this.increment(3)}</div>
        <div className="ing-name">{state.ing3Name}</div>
      </div>
    );
    let four = (
      <div className={`result-container ${this.isGrey(4)} ${this.isHidden(4)}`}>
        <div><input id="checkbox4" name="checkbox" value="4" type="checkbox" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing4).toFixed(1))}</div>
        <div className="inc">{this.increment(4)}</div>
        <div className="ing-name">{state.ing4Name}</div>
      </div>
    );
    let five = (
      <div className={`result-container ${this.isGrey(5)} ${this.isHidden(5)}`}>
        <div><input id="checkbox5" name="checkbox" value="5" type="checkbox" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing5).toFixed(1))}</div>
        <div className="inc">{this.increment(5)}</div>
        <div className="ing-name">{state.ing5Name}</div>
      </div>
    );
    let six = (
      <div className={`result-container ${this.isGrey(6)} ${this.isHidden(6)}`}>
        <div><input id="checkbox6" name="checkbox" value="6" type="checkbox" onClick={this.handleChange}/></div>
        <div className="oz">{parseFloat((ing6).toFixed(1))}</div>
        <div className="inc">{this.increment(6)}</div>
        <div className="ing-name">{state.ing6Name}</div>
      </div>
    );

    let arr = [[one],[two],[three],[four],[five],[six]];

    for(var i=0;i<x;i++){
      outputs.push(arr[i])
    }
    return outputs
  }

  measurement(){
    return(
      <div className="form">
        <button className={this.isSelected("ml")} name="ml" value="0" onClick={this.handleChange}>ml</button>
        <button className={this.isSelected("oz")} name="oz" value="1" onClick={this.handleChange}>oz</button>
        <button className={this.isSelected("floz")} name="floz" value="0" onClick={this.handleChange}>fl oz</button>
      </div>
    )
  }

  render() {
    let state = this.state;
    let change = this.handleChange;

    return (
      <div className="">
        <div className="result">
          <div className="">
            {this.newDrink()}
          </div>
        </div>
          {this.measurement()}
        <div className="inputs">
          <div className="form title">
            <input
              id="drinkCount"
              className="num"
              type={this.isMobile()}
              min="1"
              placeholder={state.drinkCount}
              name="drinkCount"
              value={state.drinkCount}
              onChange={change}
              tabIndex="1"
              onFocus={this.handleFocus}

            />
            <select
              id="select"
              className="select"
              name="drinkIncrement"
              value={state.drinkIncrement}
              onChange={change}
            >
              <option value="Eaches">Ea</option>
              <option value="Litre">Lt</option>
              <option value="Gallon">Gl</option>
              <option value="Punch Bowl">Bowl</option>
            </select>
            <input
              id="drinkname"
              name="drinkName"
              placeholder={state.drinkName}
              value={state.drinkName}
              onChange={change}
              tabIndex="2"
              onFocus={this.handleFocus}
            />
          </div>
          {this.inputs()}
          <div className="addplus">
            <button id="plus" name="inputs" value="plus" onClick={change} className={` plus ${this.isMax()}`}>
              +
            </button>

            <button id="minus" name="inputs" value="minus" onClick={change} className={` plus ${this.isMin()}`}>
              -
            </button>
          </div>
        </div>
        <p/>
        <div className="small bottom">
         * bowl = standard 10qt punch bowl
        </div>
        <p/>
      </div>
    )
  }
};

export default Form;
