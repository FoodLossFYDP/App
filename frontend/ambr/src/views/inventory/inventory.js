import React from 'react';
import InventoryTabs from './inventory_tabs.js';
import { withStyles } from '@material-ui/core/styles';
import { getInventory } from '../../requests/fetch_inventory.js';
import axios from 'axios';


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
            
        };
    };

    componentDidMount() {
        console.log("Getting inventory data...");
        axios.get('/get_inventory?houseId=1')
        .then(response => {
            this.props.handleInventoryUpdate(response.data);
        });
    }

    render () {
        return (
            <div>
                <InventoryTabs inventory={this.props.inventory} onDelete={this.props.deleteItem}/>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Inventory);