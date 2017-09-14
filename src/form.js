import React, {Component} from 'react';
import './App.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkCount: 1, // 1
      drinkIncrement: "Eaches", // Eaches =1, Gal=128, Punch=384
      drinkName: "Daiquiri", //daiquiri
      inputs:3,

      totalDrinks:1, // Eaches? "drinkCount" : drinkIncrement(gal) / totalOz
      totalOz: 448, //drinkOz(3.5) * drinkIncrement(gal=128) * drinkCount(2) = 896
      drinkOz: 3.5, // ing1 + ing2 + ing3 + ing4 + ing5 +ing6
      isPlural: false, // totalDrink > 1 ?

      "ing1Oz": 2,
      "ing1Inc": "oz",
      "ing1Name":"White Rum",

      "ing2Oz": 1,
      "ing2Inc": "oz",
      "ing2Name":"Lime",

      "ing3Oz": 0.5,
      "ing3Inc": "oz",
      "ing3Name":"Simple",

      "ing4Oz": 0,
      "ing4Inc": "oz",
      "ing4Name":"ingredient",

      "ing5Oz": 0,
      "ing5Inc": "oz",
      "ing5Name": "ingredient",

      "ing6Oz": 0,
      "ing6Inc": "oz",
      "ing6Name":"ingredient",
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
    this.setState({
      [name]: value
    });
  };


  newDrink() {
    let totalDrinks = 0;
    // eslint-disable-next-line
    let dashOz = 0.2;
    let plural = "";
    let newDrink = "";

    let ing1 = this.state.ing1Oz;
    let ing2 = this.state.ing2Oz;
    let ing3 = this.state.ing3Oz;
    let ing4 = this.state.ing4Oz;
    let ing5 = this.state.ing5Oz;
    let ing6 = this.state.ing6Oz;

    //DRINKOZ//
    let drinkOz =
        Number(ing1)
      + Number(ing2)
      + Number(ing3)
      + Number(ing4)
      + Number(ing5)
      + Number(ing6)

    //RATIOS//
    // eslint-disable-next-line
    let ing1ratio = (ing1/drinkOz).toFixed(2);
    // eslint-disable-next-line
    let ing2ratio = (ing2/drinkOz).toFixed(2);
    // eslint-disable-next-line
    let ing3ratio = (ing3/drinkOz).toFixed(2);
    // eslint-disable-next-line
    let ing4ratio = (ing4/drinkOz).toFixed(2);
    // eslint-disable-next-line
    let ing5ratio = (ing5/drinkOz).toFixed(2);
    // eslint-disable-next-line
    let ing6ratio = (ing6/drinkOz).toFixed(2);

    if (this.state.drinkIncrement === "Eaches"){
      totalDrinks = this.state.drinkCount
    }else if(this.state.drinkIncrement === "Gallon"){
      totalDrinks = Math.floor((this.state.drinkCount * 128)/drinkOz)
    }else if(this.state.drinkIncrement === "Punch Bowl"){
      totalDrinks = (this.state.drinkCount * 320)/drinkOz
    }

    ing1 = ing1 * totalDrinks;
    ing2 = ing2 * totalDrinks;
    ing3 = ing3 * totalDrinks;

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

    //PLURAL
    totalDrinks > 1 ? plural = "s" : plural = "";

    newDrink = totalDrinks + " " + this.state.drinkName + plural;

    console.log(ing1ratio, ing2ratio, ing1,drinkOz,totalDrinks)

    return (
      <div>
        <div className="name">{newDrink}</div>
        {this.results(ing1,ing2,ing3,ing4,ing5,ing6)}
      </div>
    )
  };

  isHidden(x){
    let theState = this.state[`ing${x}Oz`]
    return theState ? "show" : "hidden";
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
      type="number"
      min="0"
      name="ing1Oz"
      placeholder={state.ing1Oz}
      value={state.ing1Oz}
      onChange={change}
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
      />
      </div>
    );
    let two = (
      <div className="form fields">
      <input
      id="ing2Oz"
      className="num"
      type="number"
      min="0"
      name="ing2Oz"
      placeholder={state.ing2Oz}
      value={state.ing2Oz}
      onChange={change}
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
      />
      </div>
    );
    let three = (
      <div className="form fields">
      <input
      id="ing3Oz"
      className="num"
      type="number"
      min="0"
      name="ing3Oz"
      placeholder={state.ing3Oz}
      value={state.ing3Oz}
      onChange={change}
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
      />
      </div>
    );
    let four = (
      <div className="form fields">
      <input
      id="ing4Oz"
      className="num"
      type="number"
      min="0"
      name="ing4Oz"
      placeholder={state.ing4Oz}
      value={state.ing4Oz}
      onChange={change}
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
      />
      </div>
    );
    let five = (
      <div className="form fields">
      <input
      id="ing5Oz"
      className="num"
      type="number"
      min="0"
      name="ing5Oz"
      placeholder={state.ing5Oz}
      value={state.ing5Oz}
      onChange={change}
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
      />
      </div>
    );
    let six = (
      <div className="form fields">
      <input
      id="ing6Oz"
      className="num"
      type="number"
      min="0"
      name="ing6Oz"
      placeholder={state.ing6Oz}
      value={state.ing6Oz}
      onChange={change}
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
      <div id={this.isHidden(1)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing1}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing1Name}</div>
      </div>
    );
    let two = (
      <div id={this.isHidden(2)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing2}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing2Name}</div>
      </div>
    );
    let three = (
      <div id={this.isHidden(3)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing3}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing3Name}</div>
      </div>
    );
    let four = (
      <div id={this.isHidden(4)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing4}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing4Name}</div>
      </div>
    );
    let five = (
      <div id={this.isHidden(5)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing5}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing5Name}</div>
      </div>
    );
    let six = (
      <div id={this.isHidden(6)} className="result-container">
        <div><input id="checkbox" type="checkbox"/></div>
        <div className="oz">{ing6}</div>
        <div className="inc">oz</div>
        <div className="ing-name">{state.ing6Name}</div>
      </div>
    );

    let arr = [[one],[two],[three],[four],[five],[six]];

    for(var i=0;i<x;i++){
      outputs.push(arr[i])
    }

    return outputs
  }

  render() {
    let state = this.state;
    let change = this.handleChange;


    return (
      <div className="">
        <div className="result">
          <div className="">
            {this.newDrink()}
            <div className="small">wow cool</div>
          </div>
        </div>
        <div className="inputs">
          <div className="form title">
            <input
              id="drinkCount"
              className="num"
              type="number"
              min="1"
              placeholder={state.drinkCount}
              name="drinkCount"
              value={state.drinkCount}
              onChange={change}
            />
            <select
              id="select"
              className="select"
              name="drinkIncrement"
              value={state.drinkIncrement}
              onChange={change}
            >
              <option value="Eaches">Ea</option>
              <option value="Gallon">Gal</option>
              <option value="Punch Bowl">Bowl</option>
            </select>
            <input
              id="drinkname"
              name="drinkName"
              placeholder={state.drinkName}
              value={state.drinkName}
              onChange={change}
            />
          </div>
          {this.inputs()}
          <div className="addplus">
            <button id="plus" name="inputs" value="plus" onClick={change} className="plus">
              +
            </button>
            <button id="minus" name="inputs" value="minus" onClick={change} className="plus">
              -
            </button>
          </div>
        </div>
      </div>
    )
  }
};

export default Form;
