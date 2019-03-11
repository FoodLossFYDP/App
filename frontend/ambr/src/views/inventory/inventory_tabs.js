import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InventoryList from './inventory_list.js';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  barBackground: {
    backgroundColor: '#fff',
    boxShadow: '0 0 0 0',
    width: '100%'
  },
});

class InventoryTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, inventory } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" classes={{root: classes.barBackground}}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Inventory" />
            <Tab label="Transactions" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><InventoryList inventory={inventory}/></TabContainer>
          <TabContainer dir={theme.direction}>Transactions</TabContainer>
        </SwipeableViews> 
      </div>
    );
  }
}

InventoryTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(InventoryTabs);
