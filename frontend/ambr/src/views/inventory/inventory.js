import React from 'react';
import InventoryTabs from './inventory_tabs.js';
import { withStyles } from '@material-ui/core/styles';
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
        const inventoryItems = getInventory();
        console.log(inventoryItems);
        this.state = {
            mode: 0
        };
    };

    render () {
        return (
            <div>
                <InventoryTabs />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Inventory);