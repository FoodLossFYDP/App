import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Recipe from './recipe.js';
import { recipeItems } from '../../prototype_config/config.js';

const styles = {
  card: {
    width: 455,
  },
  media: {
    height: 140,
  },
};

class RecipeCard extends React.Component {
    state = {
        currentRecipe: {},
        open: false,
    }
    handleClickOpen = (value) => {
        console.log(value);
        this.setState({ open: true, currentRecipe: value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
  
  render() {
    const { classes } = this.props;
    return(
        <div>
        {recipeItems.map(recipeItem => ( 
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={recipeItem.imageUrl}
                    title={recipeItem.itemTitle}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipeItem.itemTitle}
                    </Typography>
                    <Typography component="p">
                        {recipeItem.itemDetail} 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleClickOpen(recipeItem.recipe)}>
                    Learn More
                    </Button>
                </CardActions>
            </Card>
            ))}
            <Recipe recipe={this.state.currentRecipe} selectedValue={this.state.open} onClose={this.handleClose}/>
        </div>
    );
  };
}

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeCard);