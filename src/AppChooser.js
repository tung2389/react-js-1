import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import ReactDOM from "react-dom";

import App_easyform from "./App-easyform";
import App_targetnumber from "./App-targetnumber";
import App_targetcharacter from "./App-targetcharacter";
import App_catchthebutton from "./App-catchthebutton";
import App_makeletterrun from "./App-makeletterrun";
import App_firstreactprogram from "./App-firstreactprogram";
import App_makeimagerun from "./App-makeimagerun";
import App_snake from "./snake";
import App_chess from "./App-chess";
import App_tic_tac_toe from "./App-tic-tac-toe";
import App_tank from "./App-tank";
import App_sudoku_solver from "./Sudoku_Solver";
class AppChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
  }
  handleChangeSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
  }
  evaluateChoice(e) {
    if(e === 11)
    {
      ReactDOM.render(<App_sudoku_solver />,document.getElementById("root"));
    }
    else if (e === 8)
      ReactDOM.render(<App_chess />, document.getElementById("root"));
    else if (e === 0)
      ReactDOM.render(
        <App_firstreactprogram />,
        document.getElementById("root")
      );
    else if (e === 1)
      ReactDOM.render(<App_targetnumber />, document.getElementById("root"));
    else if (e === 2)
      ReactDOM.render(<App_targetcharacter />, document.getElementById("root"));
    else if (e === 3)
      ReactDOM.render(<App_catchthebutton />, document.getElementById("root"));
    else if (e === 4)
      ReactDOM.render(<App_makeletterrun />, document.getElementById("root"));
    else if (e === 5)
      ReactDOM.render(<App_easyform />, document.getElementById("root"));
    else if (e === 6)
      ReactDOM.render(<App_makeimagerun />, document.getElementById("root"));
    else if (e === 7)
      ReactDOM.render(<App_snake />, document.getElementById("root"));
    else if (e === 9)
      ReactDOM.render(<App_tic_tac_toe />, document.getElementById("root"));
    else if (e === 10)
      ReactDOM.render(<App_tank />, document.getElementById("root"));
  }
  handleChange(e) {
    var name = e.target.name;
    var option;
    if (name === "firstreactprogram_load") option = 0;
    else if (name === "targetnumber_load") option = 1;
    else if (name === "targetcharacter_load") option = 2;
    else if (name === "catchthebutton_load") option = 3;
    else if (name === "makeletterrun_load") option = 4;
    else if (name === "form_load") option = 5;
    else if (name === "makeimagerun_load") option = 6;
    else if (name === "snake_load") option = 7;
    else if (name === "chess_load") option = 8;
    else if (name === "tic_tac_toe_load") option = 9;
    else if (name === "tank_load") option = 10;
    else if (name === "sudoku_solver_load") option=11;
    this.handleChangeSubmit(e);
    this.evaluateChoice(option);
  }
  render() {
    return (
      <div className="container">
        <button onClick={this.handleChange} name="chess_load">
          App_chess
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="firstreactprogram_load">
          App_firstreactprogram
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="makeletterrun_load">
          App_makeletterrun
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="form_load">
          App_form
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="targetnumber_load">
          App_targetnumber
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="targetcharacter_load">
          App_targetcharacter
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="catchthebutton_load">
          App_catchthebutton
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="makeimagerun_load">
          App_makeimagerun
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="snake_load">
          App_snake
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="tic_tac_toe_load">
          App_tic_tac_toe
        </button>
        <br />
        <br />
        <button onClick={this.handleChange} name="tank_load">
          App_tank
        </button>
        <br/>
        <br/>
        <button onClick={this.handleChange} name="sudoku_solver_load">
          Sudoku_Solver
        </button>
      </div>
    );
  }
}

export default AppChooser;
