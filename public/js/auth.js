import axios from 'axios';

const PORT = 3000;
const url = `http://localhost:${PORT}/api/v1/users`;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/login`, { email, password });

    const data = res.data;
    if (data) {
      location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${url}/logout`);
    if (res) {
      location.reload('/');
    }
  } catch (err) {
    console.log(err.response);
  }
};
