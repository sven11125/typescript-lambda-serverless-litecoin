import axios from 'axios';


const apiGet = async (url, headers = {}) => {
  return await axios.get(url, { headers: headers }).then(response => response.data).catch(error => { return null });
};

export default {
  apiGet
}