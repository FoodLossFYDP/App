import React from 'react';
import RecipeCard from './recipe_card.js';
import { withStyles } from '@material-ui/core/styles';
import { getRecipies } from '../../requests/fetch_recipes.js';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    recipesContainer: {
        paddingLeft: '1em',
    }
});

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        const RecipeItems = getRecipies();
        console.log(RecipeItems);
        this.state = {
            mode: 0
        };
    };

    render () {
        const { classes } = this.props;
        return (
            <div className={`${classes.recipesContainer}`}>
                <RecipeCard />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Recipe);