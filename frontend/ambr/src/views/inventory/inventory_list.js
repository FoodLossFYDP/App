import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';

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
  }
});

class InventoryList extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        className={classes.root}
      >
        {/* Reapeat these for each item in the inventory */}
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="5 Oranges" secondary="Added Monday, November 15"/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="10 Apples" secondary="Added Monday, November 15"/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="Added Yesterday" classes={{primary: classes.listDateText}}/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="Cilantro ~0.5lb" secondary="Added Sunday, November 14"/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="1 Head of Broccoli" secondary="Added Sunday, November 14"/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="1 Plate of Butter Chicken" secondary="Added Sunday, November 14"/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="Added 2 Days Ago" classes={{primary: classes.listDateText}}/>
        </ListItem>
        <Divider />
        <ListItem button classes={{root: classes.listItem}}>
          <ListItemText primary="1 Bottle of Orange Juice" secondary="Added Sunday, November 13"/>
          <ListItemText primary="Expired" classes={{primary: classes.listItemExpiredText}}/>
        </ListItem>
        <Divider />
      </List>
    );
  }
}

InventoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryList);
