import React, { Component } from "react";
//bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames";


type Props = {
  row: number,
  column: number,
  value: string | number,
  cellsClicked: Function
};
type State = {
  clicked: boolean,
  flag: string
};
let endMineSweeperGame = false;

class Cell extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { clicked: false, flag: "" };
  }
//The handleClick function’s goal is to facilitate the component’s rendering of this.props.value
//If this.state.flag evaluates to false, set this.state.clicked as true
//This function also displays an alert when an user has lost the game
  handleClick({ target }: SyntheticMouseEvent<>) {
    let { row, column, incCellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (!flag) this.setState({ clicked: true });
    if (!clicked) incCellsClicked();
    if (!endMineSweeperGame) {
      // Empty cell click --> recursion
      if (value === "" && target.id === `${row}_${column}`)
        recursionClick(target, row, column);
      //click bomb scenario --> end game
      if (value === "☀" && !flag) endGame(target);
      if(value ==="☀") alert("Sorry! You lost!");
    }
  }
  //The handleContextMenu(e) function takes the event object as an argument. 
  //It uses e.preventDefault() to prevent the normal actions that happen when you right click, such as displaying an options menu. 
  //This function requires this.state.clicked and this.state.flag.
  handleContextMenu(e: SyntheticMouseEvent<>) {
    e.preventDefault();
    let { clicked, flag } = this.state;
    if (!clicked)
      flag ? this.setState({ flag: "" }) : this.setState({ flag: "⚑" });
  }

//This component renders a clickable box. 
//The “onClick” handler triggers this.handleClick when the cell is “left” clicked. 
//The “onContextMenu” handler triggers this.handleContextMenu when the cell is “right” clicked. 
//If the user right clicks the cell, it should display/toggle a flag.
// If the user left clicks the cell, it should display either a number, bomb, or empty cell. 
  render() {
    let { row, column, value } = this.props;
    let { clicked, flag } = this.state;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === "☀"
    });
    return (
      <td
        id={`${row}_${column}`}
        className={cellsClass}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {clicked && !flag ? value : ""}
        {flag}
      </td>
    );
  }
}

export default Cell;
//By changing target.id, we are essentially tagging the target element.
// We tag the target element so that this cell is clicked only once
function recursionClick(target, row, column) {
  target.id = `${row}_${column}_`;
  let rowList = [row - 1, row, row + 1];
  let colList = [column - 1, column, column + 1];
  for (let i of rowList) {
    for (let j of colList) {
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      });
    }
  }
  return;
}
//endMineSweeperGame variable is set to true. 
//This ensures that the recursionClick and endGame function are not triggered by any other cell.
//We then iterate through the entire map and click each cell.
function endGame(target) {
  endMineSweeperGame = true;
  target.style.backgroundColor = "black";
  let cols = target.parentElement.children.length;
  let rows = target.parentElement.parentElement.children.length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(`${i}_${j}`))
        document.getElementById(`${i}_${j}`).click();
    }
  }
  return;
}