import React, { Component } from 'react';
import Navigation from './navigation/navbar.js';
import logo from './logo.svg';
import ViewContainer from './views/view_container.js';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 0
    }
    this.handleViewChange = this.handleViewChange.bind(this);
  }
  handleViewChange(val) {
    this.setState({view: val});
  }

  render() {
    return (
      <div className="App">
        <h2 className="viewLabel"> {
            this.state.view == 0 && "Inventory" || 
            this.state.view == 1 && "Grocery List" || 
            this.state.view == 2 && "Recipes" ||
            this.state.view == 3 && "Settings"
          }
        </h2>
        <ViewContainer view={this.state.view}/>
        <Navigation onChange={this.handleViewChange}/>
      </div>
    );
  }
}

export default App;
