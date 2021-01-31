import axios from 'axios';

export default {
  login: (data: object) => {
    return axios.put("/api/user", data);
  },
  register: (data: object) => {
    return axios.post("/api/user", data)
  }
}