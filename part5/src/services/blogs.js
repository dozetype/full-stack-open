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

const create = async (blogObj) => {
    const config = {
        headers: { Authorization: token },
    };
    const req = await axios.post(baseUrl, blogObj, config);
    // console.log(req)
    return req.data;
};

const update = async (blogObj) => {
    const config = {
        headers: { Authorization: token },
    };
    // console.log(blogObj);
    const req = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj, config);
    return req.data;
};

const remove = async (id) => {
    try {
        const config = {
            headers: { Authorization: token },
        };
        const req = await axios.delete(`${baseUrl}/${id}`, config);
        // console.log("deleted", id)
        return req.data;
    } catch (exception) {
        // console.log(exception);
        throw exception;
    }
};

export default { getAll, create, setToken, update, remove };
