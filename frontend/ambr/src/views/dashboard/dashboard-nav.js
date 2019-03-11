import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    maxHeight: '30px',
    minHeight: '27px',
    borderRadius: '2px',
  },
  tab: {
    border: '1px solid #64BEFF',
    height: '27px',
    minHeight: '27px',
    marginLeft: '-1px',
  }
};

class DashboardTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={`${classes.root}`}
        >
          <Tab label="W" className={`${classes.tab}`}/>
          <Tab label="M" className={`${classes.tab}`}/>
          <Tab label="Y" className={`${classes.tab}`}/>
        </Tabs>
      </Paper>
    );
  }
}

DashboardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardTabs);