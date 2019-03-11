import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import ItemDialog from './food-item/item.js';
import {inventoryItems} from '../../prototype_config/config.js';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  listItem: {
      borderBottom: '0px solid #f2f2f2'
  },
  listDateText: {
      fontWeight: 500,
      color: '#7d7d7d',
  },
  listItemExpiredText: {
      color: '#f34747',
      fontWeight: 300,
      paddingBottom: '1rem',
      textAlign: 'right',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});

class InventoryList extends React.Component {
  state = {
    open: false,
    currentItem: {},
    listItemPosition: {x:0,y:0}
  };

  handleClickOpen = (value) => {
    console.log(value);
    this.setState({ open: true, currentItem: value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeItem = (item, index) => {
    inventoryItems.splice(index, index + 1);
    // update master object
    // send delete request
  }

  handleDragStop = (val, item, index) => {
    if (val.changedTouches && val.changedTouches[0].clientX > 350) {
      this.removeItem(item,index);
    } else {
      this.setState({listItemPosition: {x:0,y:0}})
    }

  }

  render() {
    const { classes, inventory } = this.props;
    return (
      <List
        component="nav"
        className={classes.root}
      >
        {/* Reapeat these for each item in the inventory */}
        {inventory.map((inventoryItem,index) => (
          <div>
            <Draggable
              axis='x'
              onStop={val => this.handleDragStop(val, inventoryItem, index)}
              position={{x:0,y:0}}
              bounds={{left: 0}}>
              <ListItem button classes={{root: classes.listItem}} onClick={() => this.handleClickOpen(inventoryItem)}>
                <ListItemText primary={inventoryItem.qty + " " + inventoryItem.item} secondary={inventoryItem.dateUpdated}/>
              </ListItem>
            </Draggable>
            <Divider />
          </div>
        ))
        }
        <ItemDialog selectedValue={this.state.open} itemValue={this.state.currentItem} onClose={this.handleClose}></ItemDialog>
      </List>
    );
  }
}

InventoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryList);
