import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = () => {
    const request = axios.get(`${baseURL}all`);
    return request.then((res) => res.data); //return people
};

export default { getAll };
