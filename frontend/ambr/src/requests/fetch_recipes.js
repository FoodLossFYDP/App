import axios from 'axios';

export function getRecipies(){
    let data;
    axios.get('/recipes')
        .then(response => {
            data = response.data;
        });
    return data;
}
