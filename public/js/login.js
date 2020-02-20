import axios from 'axios';

const PORT = 3000;
const url = `http://127.0.0.1:${PORT}/api/v1`;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/user/login`, { email, password });
    return res;
  } catch (err) {
    console.log(err.response);
  }
};
