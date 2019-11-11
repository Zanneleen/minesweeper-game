import React, { Component } from "react";
import Cell from "./cell";
import {
  nestedArray,
  populateNestedArray,
  valsAdjacentCounts
} from "../helpers";

//props & state
type Props = {};
type State = {
  mapSize: number,
  bombCount: number,
  theMap: Array<Array<number | string>>,
  cellsClicked: number
};

//constructor function
//theMap is the returned value of 3 composed functions. 
//This means that the returned value of nestedArray() is used as an argument (input) for populateNestedArray(). 
//The returned value of populateNestedArray() is used as an argument for valsAdjacentCounts()
class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let mapSize = 10;
    let bombCount = 10;
    this.state = {
      mapSize,
      bombCount,
      theMap: valsAdjacentCounts(
        populateNestedArray(nestedArray(mapSize, mapSize), "☀", bombCount),
        "☀"
      ),
      cellsClicked: 1
    };
  }
//incCellsClicked() is used to keep track of how many cells are clicked. 
//If all the “safe cells” are clicked, then the player will have won and an alert will display.
  incCellsClicked() {
    let { mapSize, bombCount, cellsClicked } = this.state;
    let safeCells = mapSize * mapSize - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    if (cellsClicked >= safeCells) alert("☀☀☀ Congratulations! You have won! ☀☀☀");
  }
//below all the above items is rendered
  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.theMap.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        incCellsClicked={this.incCellsClicked.bind(this)}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Map;