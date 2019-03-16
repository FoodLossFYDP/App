import axios from 'axios';

export function getInventory(){
    let data;
    axios.get('/get_inventory?houseId=1')
        .then(response => {
            data = response.data;
        });
    return data;
}
