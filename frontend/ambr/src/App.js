import React, { Component } from 'react';
import Navigation from './navigation/navbar.js';
import logo from './logo.svg';
import ViewContainer from './views/view_container.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <ViewContainer />
        <Navigation />
      </div>
    );
  }
}

export default App;
