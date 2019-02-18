import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './navbar.css';

const styles = {
  root: {
    width: 500
  },
};

class AmbrNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(value);
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
        <BottomNavigationAction label="Fridge" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Shopping List" icon={<FavoriteIcon /> } />
        <BottomNavigationAction label="Recipes" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Settings" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

AmbrNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AmbrNavigation);