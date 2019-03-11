import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
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
  },
  addItemButton: {
    float: 'bottom',
    alignSelf: 'center',
    width: '50%',
    marginTop: '200px',
  },
  groceryContainer: {
    height: '100%'
  },
  lastItem: {
    color: '#c4c2c2'
  }
});

class GroceryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateChanged: false,
      newFoodItems: [{name: null, qty: null}],
      newFoodItemChecked: false,
      groceryList: [{
        id: null,
        name: null,
        qty: null,
        checked: false,
      }]
    };
  }

  handleToggle = i => () => {
    console.log(i);
    Object.assign(this.state.groceryList[i], {checked: !this.state.groceryList[i].checked});
    this.setState({stateChanged: !this.state.stateChanged});
    console.log(this.state.groceryList[i]);
  };

  componentDidMount() {
      axios.get('/groceries')
          .then(response => {
              console.log(response.data);
              this.setState({groceryList: [...response.data, ...this.state.groceryList]});
          });
  }

  handleItemChange = (index) => event => {
    console.log("Hello");
    if (index == this.state.groceryList.length - 1) {
      let tempList = this.state.groceryList;
      Object.assign(tempList[index], {id: tempList.length > 1 ? tempList[index - 1].id + 1 : 1, name: event.target.value});
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
      <div className={`${classes.groceryContainer}`}>
        <List className={classes.root}>
          {this.state.groceryList.map((value, index) => (
              <div>
            <ListItem key={value.id} role={undefined} dense >
              <Checkbox
                className={`${index==this.state.groceryList.length -1 && classes.lastItem}`}
                checked={value.checked}
                tabIndex={-1}
                disableRipple
                button 
                onClick={this.handleToggle(index)}
              />
              <InputBase className={`${classes.margin} ${index==this.state.groceryList.length -1 && classes.lastItem}`} 
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
        {/* <Button variant="contained" color="primary" className={`${classes.button} ${classes.addItemButton}`}>
          Add to Inventory
        </Button> */}
      </div>
    );
  }
}

GroceryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryList);