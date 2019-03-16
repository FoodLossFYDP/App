import React from 'react';
import Inventory from './inventory/inventory.js';
import GroceryList from './grocery/grocery.js';
import SearchBar from '../search/search_bar.js';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Recipe from './recipes/recipes_view.js';
import Dashboard from './dashboard/dashboard.js';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    viewContainer: {
        paddingBottom: '52px'
    }
    
});

class ViewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { classes } = this.props;
        const view = this.props.view;
        return (
            <div className={`${classes.viewContainer}`}>
                <SearchBar view={view}/>
                {view == 0 && <Inventory inventory={this.props.inventory} deleteItem={this.props.deleteItem}/> || 
                view == 1 && <GroceryList /> || 
                view == 2 && <Recipe /> || 
                view == 3 && <Dashboard />}
            </div>
        );
    }
}

export default withStyles(styles)(ViewContainer);