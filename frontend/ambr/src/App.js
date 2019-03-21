import React, { Component } from 'react';
import Navigation from './navigation/navbar.js';
import logo from './logo.svg';
import ViewContainer from './views/view_container.js';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {inventoryItems} from './prototype_config/config.js';
import axios from 'axios';
import AddItemDialog from './views/inventory/food-item/add_item.js';

import './App.css';
import inventory from './views/inventory/inventory.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 0,
      inventory: [],
      open: false,
    }
    this.handleViewChange = this.handleViewChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInventoryUpdate = this.handleInventoryUpdate.bind(this);
  }
  handleViewChange(val) {
    this.setState({view: val});
  }

  handleInventoryUpdate(data) {
    // data.dateUpdated = data.dateUpdated * 1000;
    this.setState({inventory: data || []});
  }

  handleInventoryDelete(data) {
    // data.dateUpdated = data.dateUpdated * 1000;
    this.setState({inventory: data || []});
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteItem = (index) => {
      let i = this.state.inventory;
      let a = i[index]
      axios.get('/delete_inventory?item='+a.item+'&houseId=1')
      .then(response => {
          this.handleInventoryDelete(response.data);
      });
      // i.splice(index, 1);
      // this.setState({inventory: i});
     
  }

  handleAddItemClick = () => {
    this.setState({open: true});
  }

  addItem = (itemname, itemqty, itemMeasurement) => {
    //send request
    let inventory = this.state.inventory;
    console.log(itemname);
    console.log(itemqty);

    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].item == itemname) {
        let x = parseInt(inventory[i].qty.split(" ")[0]) + parseInt(itemqty);
        let unit = inventory[i].qty.split(" ")[1] || "";
        inventory[i].qty = x + " " + unit;
      }
    }
    let a = {
        houseId: "20652932",
        qty: itemqty, 
        item: itemname, 
        dateUpdated: Date.now(), 
        uncertainQty: false, 
        measurement: itemMeasurement,
        tips: [], 
        updateQtySuggestions: [],
        expiringSoon: false,
    };
    axios.get('/add_inventory?qty='+a.qty+'&item='+a.item+'&dateUpdated='+a.dateUpdated+'&measurement='+a.measurement +'&houseId=1&username=xx')
        .then(response => {
            this.props.handleInventoryUpdate(response.data);
        });
  }

  render() {
    return (
      <div className="App">
        <div className="headerContainer">
          <h2 className="viewLabel"> {
              this.state.view == 0 && "Inventory" || 
              this.state.view == 1 && "Grocery List" || 
              this.state.view == 2 && "Recipes" ||
              this.state.view == 3 && "Dashboard"
            }
          </h2>
          {this.state.view == 0 ? 
            <div>
              <IconButton aria-label="Delete" className="addButton" onClick={this.handleAddItemClick}>
                <AddIcon className="addIcon"/>
              </IconButton> 
              <AddItemDialog selectedValue={this.state.open} onClose={this.handleClose} addItem={this.addItem}></AddItemDialog>
            </div>
            : null}
        </div>
        <ViewContainer view={this.state.view} inventory={this.state.inventory} deleteItem={this.deleteItem} handleInventoryUpdate={this.handleInventoryUpdate}/>
        <Navigation onChange={this.handleViewChange}/>
      </div>
    );
  }
}

export default App;
