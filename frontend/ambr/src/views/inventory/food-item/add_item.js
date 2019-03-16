import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    dialogText: {
      textAlign: 'center'
    },
    dialogTitle: {
      fontSize: '24px',
    },
    dialogExpiry: {
      color: '#F34747'
    },
    dialogEntryDate: {
      fontSize: '13px'
    },
    dialogConfirmQty: {
      fontSize: '14px'
    },
    textField: {
        marginTop: '0px',
        width: '100%'
    },
    addButton: {
        width: '80%',
        position: 'absolute',
        bottom: '66px',
        left: '10%',

    }
  });

class AddItemDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListAddItemClick = value => {
    this.props.onClose(value);
  };

  handleItemQtyChange = event => {
      //call function that updates quantity
      this.setState({itemQty: event.target.value});
  };

  handleItemNameChange = event => {
      this.setState({itemName: event.target.value});
  };

  addItem = () => {
      this.props.addItem(this.state.itemName,this.state.itemQty);
      this.handleClose();
  }

  constructor(props) {
      super(props);
      this.state = {
          itemName: "",
          itemQty: 0,
          itemMeasurement: "count",
      }
  }
  render() {
    const { classes, onClose, selectedValue, itemValue, ...other } = this.props;
    let value = itemValue;
    return (
        <Dialog
            fullScreen={true}
            open={selectedValue}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogContent>
                <h1 className={`${classes.dialogTitle} ${classes.dialogText}`}>Add Item</h1>
                <h3>Item Name</h3>
                <TextField
                    id="item-name"
                    label="Item Name"
                    className={classes.textField}
                    onChange={this.handleItemNameChange}
                    margin="normal"
                    variant="outlined"
                />
                <h3>Item Quantity</h3>
                <TextField
                    id="item-name"
                    label="Item Quantity"
                    className={classes.textField}
                    onChange={this.handleItemQtyChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button className={classes.addButton} color="ecefef" onClick={this.addItem} variant="outlined">Add Item</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(AddItemDialog);