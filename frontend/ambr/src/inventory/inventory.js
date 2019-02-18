import React from 'react';
import InventoryTabs from './inventory_tabs.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class Inventory extends React.Component {
    render () {
        return (
            <InventoryTabs />
        );
    }
}

export default withStyles(styles, { withTheme: true })(Inventory);