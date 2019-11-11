import React, { Component } from "react";
import Map from "./containers/map";
import "./App.css";
//imported bootstrap items
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dialog from './containers/Dialog';


class App extends Component {
  state={isOpen:false}//for the popup dialog
  render() {
    const widthStyle = {
      width: "800px"
    };//width for the minesweeper component

    return (
      <div style={widthStyle}>
        <div className="App">  
        <Container>  {/*all of the items is inside the container */} 
          <br />
          <Map className="map" />{/*returns the minesweeper map to display*/}
          <Button variant="Warning" className="Button" href="/">Restart Game</Button>{/*button displays orange and the page is reloaded when this button is clicked*/}
          {/*Rules of the game button has a popup dialog that explains the game and can be closed*/}
          <Button variant="Warning" className="Button" onClick={(e)=>this.setState({isOpen:true})}>Rules of the game</Button>
          
          {/*below are the items that is being displayed in the dialog box on click*/}
          <Dialog isOpen={this.state.isOpen} onClose={(e)=>this.setState({isOpen:false})}>         
          How to play minesweeper:<br/>{/*header in the dialog box*/}
        1) The goal of the game is to NOT click any bombs.<br/>
        2)Do not worry where your first click is<br/>
          3) Each number tells you how many bombs are adjacent to the "clicked"
          cell.<br/>
        4) The numbers range from 0 to 8. Each cell has 8 neighbors.<br/>
        5) Use process of elimination to choose where to click next.<br/>
        Tip: Left click to insert a flag!
          </Dialog>{/*dialog box links with dialog.js file*/}

          </Container>
        </div>
      </div>
    );
  }
}

export default App;