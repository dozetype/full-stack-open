import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
};

const create = async ( blogObj ) => {
    console.log(token)
    const config = {
        headers: { Authorization: token },
    };
    const req = await axios.post(baseUrl, blogObj, config);
    return req.data;
};

export default { getAll, create, setToken };
