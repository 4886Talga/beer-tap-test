import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://beer-tap-fd7d5.firebaseio.com/'
});

export default instance;