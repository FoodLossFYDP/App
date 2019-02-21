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
        
        <ViewContainer view={this.state.view}/>
        <Navigation onChange={this.handleViewChange}/>
      </div>
    );
  }
}

export default App;
