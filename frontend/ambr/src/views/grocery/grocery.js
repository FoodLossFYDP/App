import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
  root: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
  },
});

class GroceryList extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
      {/*array of list items will be mapped instead*/}
        {[0, 1, 2, 3].map(value => (
            <div>
          <ListItem key={value} role={undefined} dense >
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              button 
              onClick={this.handleToggle(value)}
            />
            <InputBase className={classes.margin} defaultValue={`Line item ${value + 1}`}  />
           
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