import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    dialogText: {
      paddingLeft: '20px'
    },
    unorderedList: {
      paddingLeft: '20px'
    }
  });

class RecipeDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListRecipeClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, recipe, ...other } = this.props;

    return (
        <Dialog
            fullScreen={false}
            open={selectedValue}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogContent>
                <h1 className={`${classes.dialogUl}`}>{recipe.recipeName}</h1>
                <h3>Ingredients</h3>
                <ul className={`${classes.unorderedList}`}>{recipe.ingredients && recipe.ingredients.map(ingredient => (<li>{ingredient}</li>))}</ul>
                <h3>Instructions</h3>
                {recipe.steps && recipe.steps.map((step, index) => (<p>{index + 1} {".   " + step}</p>))}
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

export default withStyles(styles)(RecipeDialog);