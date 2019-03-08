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
  state = {
    stateChanged: false,
    newFoodItem: null,
    newFoodItemChecked: false
  };

  handleToggle = i => () => {
    console.log(i);
    Object.assign(groceryItems[i], {checked: !groceryItems[i].checked});
    this.setState({stateChanged: !this.state.stateChanged});
    console.log(groceryItems[i]);
  };

  handleNewItem = name => event => {
    this.setState({ newFoodItem: event.target.value });
    console.log(event.target.value );
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
      {/*array of list items will be mapped instead*/}
        {groceryItems.map((value, index) => (
            <div>
          <ListItem key={value.id} role={undefined} dense >
            <Checkbox
              checked={value.checked}
              tabIndex={-1}
              disableRipple
              button 
              onClick={this.handleToggle(index)}
            />
            <InputBase className={classes.margin} defaultValue={value.name}  />
          
          </ListItem>
          <Divider />
          </div>
        ))}
        {/* Programmatically add the code below
        TODO: update groceryList once typing begins, add a new checkbox */}
        <ListItem key={"new"} role={undefined} dense >
            <Checkbox
              checked={this.state.newFoodItemChecked}
              tabIndex={-1}
              disableRipple
              button 
              onClick={this.handleToggle("new")}
            />
            <InputBase className={classes.margin} 
              defaultValue="Add new food item"
              value={this.state.newFoodItem}
              onChange={this.handleNewItem('name')} 
              onClick={() => (this.state.newFoodItem == null && this.setState({newFoodItem: ""}))}/>
        </ListItem>
        <Divider />
      </List>
    );
  }
}

GroceryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryList);