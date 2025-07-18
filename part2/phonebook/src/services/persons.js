import axios from "axios";
const baseUrl = "/api/persons";
// const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((res) => res.data); //return people
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((res) => res.data); // return created person
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((res) => res.data); //return updated person
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((res) => res.data); //return removed person
};

export default { getAll, create, remove, update};
