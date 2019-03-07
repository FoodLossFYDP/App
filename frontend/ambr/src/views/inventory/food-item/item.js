import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const emails = ['username@gmail.com', 'user02@gmail.com'];
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
    }
  });

class ItemDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  updateItemQuantity = value => {
      //call function that updates quantity
      console.log(value);
  }
  render() {
    const { classes, onClose, selectedValue, itemValue, ...other } = this.props;
    let value = itemValue;
    return (
        <Dialog
            fullScreen={false}
            open={selectedValue}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogContent>
                <h1 className={`${classes.dialogTitle} ${classes.dialogText}`}>{value.qty + " " + value.item}</h1>
                <p className={`${classes.dialogExpiry} ${classes.dialogText}`}>Expiring Soon</p>
                <p className={`${classes.dialogEntryDate} ${classes.dialogText}`}>{value.dateUpdated}</p>
                {
                    value.uncertainQty && 
                    <div className={`${classes.dialogText}`}>
                        <p className={`${classes.dialogConfirmQty} ${classes.dialogText}`}>How many {value.item} are left?</p>
                        {value.updateQtySuggestions.map(qty => (
                            <Button onClick={() => this.updateItemQuantity(qty)}>{qty}</Button>
                        ))}
                    </div>
                }
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

export default withStyles(styles)(ItemDialog);