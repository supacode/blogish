import axios from 'axios';

const PORT = 3000;
const url = `http://localhost:${PORT}/api/v1`;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/users/login`, { email, password });

    const data = res.data;
    if (data) {
      location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
