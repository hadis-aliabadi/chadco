
import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});
export function setAPIHeader(
  key: string,
  value: string,
) {
  axios.defaults.headers.common[key] = value;
}



export const get = async (
  uri: string,
  params?: any,
) => {
  return await axios
    .get(uri, { params })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

  