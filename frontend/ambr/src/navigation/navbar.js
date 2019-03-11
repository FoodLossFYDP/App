import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import KitchenOutlinedIcon from '@material-ui/icons/KitchenOutlined';
import RoomServiceOutlinedIcon from '@material-ui/icons/RoomServiceOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import './navbar.css';

const styles = {
  root: {
    width: '100%'
  },
};

class AmbrNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.props.onChange(value);
    this.setState({value})
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={`classes.root Navbar`}
      >
        <BottomNavigationAction label="Fridge" icon={<KitchenOutlinedIcon />} />
        <BottomNavigationAction label="Groceries" icon={<ShoppingBasketOutlinedIcon /> } />
        <BottomNavigationAction label="Recipes" icon={<RoomServiceOutlinedIcon />} />
        <BottomNavigationAction label="Dashboard" icon={<DashboardOutlinedIcon />} />
      </BottomNavigation>
    );
  }
}

AmbrNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AmbrNavigation);