import axios from 'axios';

const PORT = 3000;
const url = `http://127.0.0.1:${PORT}/api`;

export const login = async (email, password) => {
  try {
    await axios.post(`${url}/user/`, { email, password });
  } catch (err) {
    console.log(err);
  }
};
