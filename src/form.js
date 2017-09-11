import React, {Component} from 'react';
import './App.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkCount: 1,
      select: "eaches",
      drinkName: "Daiquiri",
      drinkOz: 3.5,
      isPlural: false,
      count:0,
      calculated:1,
      ing1:{
        "oz": "2",
        "select": "Oz",
        "name":"White Rum",
      },
      ing2:{
        "oz": "1",
        "select": "Oz",
        "name":"Lime",
      },
      ing3:{
        "oz": ".5",
        "select": "Oz",
        "name":"Simple",
      },
      ing4:{
        "oz": 0,
        "select": null,
        "name":null,
      },
      ing5:{
        "oz": 0,
        "select": null,
        "name":null,
      },
      ing6:{
        "oz": 0,
        "select": null,
        "name":null,
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let drinkOz =
      Number(this.state.ing1.oz) +
      Number(this.state.ing2.oz) +
      Number(this.state.ing3.oz) +
      Number(this.state.ing4.oz) +
      Number(this.state.ing5.oz) +
      Number(this.state.ing6.oz)

    if(name === "drinkCount"){
      if(value > 1){
        this.setState({
          isPlural:true
        })
      }else{
        this.setState({
          isPlural:false
        })
      }
    };

    if(value === "eaches"){
      this.setState({
        calculated:1,
        isPlural:false
      })
    }else if(value === "gal"){
      this.setState({
        calculated:128,
        isPlural:true
      })
    }else if(value === "punch"){
      this.setState({
        calculated:384,
        isPlural:false
      })
    };

    if(name.slice(0,3) === "ing"){
      this.setState({
        [name]:[value]
      })
    }
    this.setState({
      drinkOz:[drinkOz]
    });

    this.setState({[name]: value});
  };

  newDrink() {
    let select = this.state.select;
    let size = this.state.drinkOz;
    let count = this.state.drinkCount;
    let drink = this.state.drinkName;
    let calc = this.state.calculated;
    let isPlur = this.state.isPlural;

    let newCount = Math.floor((count * calc)/size);

    let plur = "";

    isPlur ? plur = "'s": plur = "";

    if (select === "eaches") {
      return count + " " + drink + plur;
    } else{
      return newCount + " " + drink + plur;
    }
  };

  render() {
    let select = this.state.select;
    let size = this.state.drinkOz;
    let count = this.state.drinkCount;
    let drink = this.state.drinkName;
    let calc = this.state.calculated;
    let isPlur = this.state.isPlural;
    let change = this.handleInputChange;
    let newCount = 1;

    if(select != "eaches"){
      newCount = Math.floor((count * calc)/size);
    }else{
      newCount = count;
    }

    return (
      <div className="flex-spacebetween flex-column">
        <div className="inputs">

        {/****************
        *** DRINK NAME ***
        ******************/}
          <div className="form flex-between">
            <input
              type="number"
              min="1"
              id="drinkCount"
              placeholder={count}
              name="drinkCount"
              value={count}
              onChange={change}
            />
            <select
              id="select"
              name="select"
              className="select"
              value={select}
              onChange={change}
            >
              <option value="eaches">Eaches</option>
              <option value="gal">Gal</option>
              <option value="punch">Punch Bowl</option>
            </select>
            <input
              id="drinkname"
              name="drinkName"
              placeholder={drink}
              value={drink}
              onChange={change}
            />
          </div>

        {/****************
        *** ING ONE ***
        ******************/}
        <div className="form flex-between">
          <input
            type="number"
            min="0"
            id="drinkCount"
            placeholder={this.state.ing1.count}
            name="ing1.count"
            value={this.state.ing1.count}
            onChange={change}
          />
          <select
            id="select"
            name="ing1.select"
            className="select"
            value={this.state.ing1.select}
            onChange={change}
          >
            <option value="oz">oz</option>
            <option value="dash">dash</option>
          </select>
          <input
            id="drinkname"
            name="ing1.name"
            placeholder={this.state.ing1.name}
            value={this.state.ing1.name}
            onChange={change}
          />
        </div>

        {/****************
        *** ING TWO ***
        ******************/}

        {/****************
        *** ING THREE ***
        ******************/}

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
                {newCount * this.state.ing1.oz *1.04} fl oz {this.state.ing1.name}
                <div className="small">{((newCount*this.state.ing1.oz)/25.5).toFixed(1)} bottles</div>
              </div>
              <div>
                {newCount * this.state.ing2.oz} {this.state.ing2.select} {this.state.ing2.name}
              </div>
              <div>
                {newCount * this.state.ing3.oz} {this.state.ing3.select} {this.state.ing3.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Form;
