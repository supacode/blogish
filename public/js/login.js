import axios from 'axios';

const PORT = 3000;
const url = `http://localhost:${PORT}/api/v1`;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/users/login`, { email, password });

    console.log(res.data);
  } catch (err) {
    console.log(err.response.data);
  }
};
