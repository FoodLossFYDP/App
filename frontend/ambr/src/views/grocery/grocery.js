import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { groceryItems } from '../../prototype_config/config.js';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginTop: '0px',
    width: '435px'
  },
  formContainer: {
    textAlign: 'left',
    paddingLeft: '25px',
  }
});

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    let groceryList = groceryItems;
    groceryList.push({
        id: null,
        name: null,
        qty: null,
        checked: false,
    });

    this.state = {
      stateChanged: false,
      newFoodItems: [{name: null, qty: null}],
      newFoodItemChecked: false,
      groceryList
    };
  }

  handleToggle = i => () => {
    console.log(i);
    Object.assign(this.state.groceryList[i], {checked: !this.state.groceryList[i].checked});
    this.setState({stateChanged: !this.state.stateChanged});
    console.log(this.state.groceryList[i]);
  };

  handleItemChange = (index) => event => {
    console.log("Hello");
    if (index == this.state.groceryList.length - 1) {
      let tempList = this.state.groceryList;
      Object.assign(tempList[index], {id: tempList[index - 1].id + 1, name: event.target.value});
      tempList.push({
        id: null,
        name: undefined,
        qty: null,
        checked: false,
      });
      // call code to update backend somewhere
      this.setState({groceryList: tempList});
    } else {
      let tempList = this.state.groceryList;
      tempList[index] = {...tempList[index], ...{name: event.target.value}};
      this.setState({groceryList: this.state.groceryList})
    }
  };

  handleClick = index => {
    console.log(this.state.groceryList[index]);
    if (this.state.groceryList[index].name == undefined) {
      this.setState({
        groceryList: [
          ...this.state.groceryList.splice(0, index),
          {...this.state.groceryList[index], name: ""},
          ...this.state.groceryList.splice(index + 1)
        ],
        focusedItem: index
      })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
      {/*array of list items will be mapped instead*/}
        {this.state.groceryList.map((value, index) => (
            <div>
          <ListItem key={value.id} role={undefined} dense >
            <Checkbox
              checked={value.checked}
              tabIndex={-1}
              disableRipple
              button 
              onClick={this.handleToggle(index)}
            />
            <InputBase className={classes.margin} 
              value={value.name}  
              defaultValue="Add new food item"
              onChange={this.handleItemChange(index)}
              onClick={() => this.handleClick(index)}
              autoFocus={this.state.focusedItem == index}
            />
          </ListItem>
          <Divider />
          </div>
        ))}
      </List>
    );
  }
}

GroceryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryList);