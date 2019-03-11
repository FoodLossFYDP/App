import React from 'react';
import RecipeCard from './recipe_card.js';
import { withStyles } from '@material-ui/core/styles';
import { getRecipies } from '../../requests/fetch_recipes.js';
import axios from 'axios';

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
            mode: 0,
            recipes: []
        };
    };

    componentDidMount() {
        axios.get('/recipes')
            .then(response => {
                this.setState({recipes: response.data || []});
            }
        );
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={`${classes.recipesContainer}`}>
                <RecipeCard recipes={this.state.recipes}/>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Recipe);