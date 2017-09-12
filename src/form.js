import React, {Component} from 'react';
import './App.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkCount: 1, // 1
      drinkIncrement: "Eaches", // Eaches =1, Gal=128, Punch=384
      drinkName: "Daiquiri", //daiquiri

      totalDrinks:1, // Eaches? "drinkCount" : drinkIncrement(gal) / totalOz
      totalOz: 448, //drinkOz(3.5) * drinkIncrement(gal=128) * drinkCount(2) = 896
      drinkOz: 3.5, // ing1 + ing2 + ing3 + ing4 + ing5 +ing6
      isPlural: false, // totalDrink > 1 ?
      dashOz: 0.02, //ingOz * 0.02

      "ing1Oz": 2,
      "ing1Inc": "Oz",
      "ing1Name":"White Rum",
      "ing1Ratio":0.57 , //ing1Oz / drinkOz

      "ing2Oz": 1,
      "ing2Inc": "Oz",
      "ing2Name":"Lime",
      "ing2Ratio":0.28,

      "ing3Oz": 0.5,
      "ing3Inc": "Oz",
      "ing3Name":"Simple",
      "ing3Ratio":0.14,

      "ing4Oz": 0,
      "ing4Inc": "",
      "ing4Name":"",
      "ing4Ratio":0 ,

      "ing5Oz": 0,
      "ing5Inc": "",
      "ing5Name": "",
      "ing5Ratio":0,

      "ing6Oz": 0,
      "ing6Inc": "",
      "ing6Name":"",
      "ing6Ratio":0,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  ratios(){
    let drinkOz = this.state.drinkOz;
    let ratio1 = this.state.ing1Oz / drinkOz;
    let ratio2 = this.state.ing2Oz / drinkOz;
    let ratio3 = this.state.ing3Oz / drinkOz;
    let ratio4 = this.state.ing4Oz / drinkOz;
    let ratio5 = this.state.ing5Oz / drinkOz;
    let ratio6 = this.state.ing6Oz / drinkOz;

    this.setState({
      ing1Ratio:ratio1,
      ing2Ratio:ratio2,
      ing3Ratio:ratio3,
      ing4Ratio:ratio4,
      ing5Ratio:ratio5,
      ing6Ratio:ratio6
    });
  };

  totalOz(){
    let drinkOz =
      Number(this.state.ing1Oz) +
      Number(this.state.ing2Oz) +
      Number(this.state.ing3Oz) +
      Number(this.state.ing4Oz) +
      Number(this.state.ing5Oz) +
      Number(this.state.ing6Oz)

    this.setState({
      drinkOz:drinkOz
    });
  };

  totalDrinks(){
    let totalDrinks = 0;

    if (this.state.drinkIncrement === "Eaches"){
      totalDrinks = this.state.drinkCount * this.state.drinkOz
    }else if(this.state.drinkIncrement === "Gallon"){
      totalDrinks = (this.state.drinkCount * 128)/this.state.drinkOz
    }else if(this.state.drinkIncrement === "Punch Bowl"){
      totalDrinks = (this.state.drinkCount * 320)/this.state.drinkOz
    }

    this.setState({
      totalDrinks:totalDrinks,
    });
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.totalOz()
    this.ratios()
    this.totalDrinks()

    this.setState({
      [name]: value
    });
  };

  newDrink() {
    let totalDrinks = 0;

    if (this.state.drinkIncrement === "Eaches"){
      totalDrinks = this.state.drinkCount
    }else if(this.state.drinkIncrement === "Gallon"){
      totalDrinks = (this.state.drinkCount * 128)/this.state.drinkOz
    }else if(this.state.drinkIncrement === "Punch Bowl"){
      totalDrinks = (this.state.drinkCount * 320)/this.state.drinkOz
    }

    let plural = "";
    let newDrink = "";

    this.state.isPlural ? plural = "'s" : plural = "";
    newDrink = totalDrinks + " " + this.state.drinkName + "'s";

    return newDrink;
  };


  render() {
    let state = this.state;
    let change = this.handleInputChange;


    return (
      <div className="flex-spacebetween flex-column">
        <div className="inputs">

        {/****************
        *** DRINK NAME ***
        ******************/}
          <div className="form flex-between title">
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
              <option value="Eaches">Eaches</option>
              <option value="Gallon">Gallon</option>
              <option value="Punch Bowl">Punch Bowl</option>
            </select>
            <input
              id="drinkname"
              name="drinkName"
              placeholder={state.drinkName}
              value={state.drinkName}
              onChange={change}
            />
          </div>

        {/****************
        *** ING ONE ***
        ******************/}
        <div className="form flex-between">
          <input
            id="ing1Oz"
            className="num"
            type="number"
            min="0"
            name="ing1Oz"
            step="0.5"
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

        {/****************
        *** ING TWO ***
        ******************/}
        <div className="form flex-between">
          <input
            id="ing2Oz"
            className="num"
            type="number"
            min="0"
            name="ing2Oz"
            step="0.5"
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

        {/****************
        *** ING THREE ***
        ******************/}
        <div className="form flex-between">
          <input
            id="ing3Oz"
            className="num"
            type="number"
            min="0"
            name="ing3Oz"
            step="0.5"
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

        {/****************
        *** ING FOUR ***
        ******************/}

        {/****************
        *** ING FIVE ***
        ******************/}

        {/****************
        *** ING SIX ***
        ******************/}


        {/****************
        *** ADD/MINUS ***
        ******************/}
          <div className="addplus">
            <button id="plus" className="plus">
              +
            </button>
            <button id="minus" className="plus">
              -
            </button>
          </div>

        {/****************
        *** RESULTS ***
        ******************/}
          <div className="flex-center flex-column result">
            <div className="name">{this.newDrink()}
              <center><div className="small">wow cool</div></center>
            </div>

            <div style={{textAlign : 'left'}}>
              <div>
              </div>

              <div>
                {this.state.drinkIncrement === "Eaches" ? (this.state.ing1Oz * this.state.drinkCount) : (128 * state.ing1Ratio)} {state.ing1Inc} {state.ing1Name}
              </div>

              <div>
                {this.state.drinkIncrement === "Eaches" ? (this.state.ing2Oz * this.state.drinkCount) : (128 * state.ing2Ratio)} {state.ing2Inc} {state.ing2Name}
              </div>

              <div>
                {this.state.drinkIncrement === "Eaches" ? (this.state.ing3Oz * this.state.drinkCount) : (128 * state.ing3Ratio)} {state.ing3Inc} {state.ing3Name}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Form;
