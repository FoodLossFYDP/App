import axios from 'axios';

export function getInventory(){
    let data;
    axios.get('/inventory')
        .then(response => {
            data = response.data;
        });
    return data;
}
