import React from 'react';
import InventoryTabs from './inventory_tabs.js';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { getInventory } from '../../requests/fetch_inventory.js';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
});

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            inventory: []
        };
    };

    componentDidMount() {
        axios.get('/inventory')
            .then(response => {
                this.setState({inventory: response.data || []});
            });
    }

    render () {
        return (
            <div>
                <InventoryTabs inventory={this.state.inventory}/>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Inventory);