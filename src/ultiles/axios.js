import axios from 'axios';

let instance= axios.create({
    baseURL: process.env.REACT_APP_NEWS_URL,

});
instance.defaults.headers.common['x-Api-key']= process.env.REACT_APP_NEWS_API_KEY;

export default instance;