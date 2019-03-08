import React from 'react';
import Inventory from './inventory/inventory.js';
import GroceryList from './grocery/grocery.js';
import SearchBar from '../search/search_bar.js';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Recipe from './recipes/recipes_view.js';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    
});

class ViewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { classes } = this.props;
        const view = this.props.view;
        return (
            <div>
                <SearchBar />
                {view == 0 && <Inventory /> || view == 1 && <GroceryList /> || view == 2 && <Recipe />}
            </div>
        );
    }
}

export default withStyles(styles)(ViewContainer);