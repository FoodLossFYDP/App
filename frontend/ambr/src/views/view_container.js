import React from 'react';
import Inventory from './inventory/inventory.js';
import SearchBar from '../search/search_bar.js';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

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
        this.state = {
            view: 0
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <SearchBar />
                <Inventory />
            </div>
        );
    }
}

export default withStyles(styles)(ViewContainer);