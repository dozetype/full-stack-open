import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const create = async ({blogObj}) => {
    const req = await axios.post(baseUrl, blogObj)
    return req.data
}

export default { getAll, create }
