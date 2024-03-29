import axios from 'axios';
import { Alert } from './alert';

const PORT = 3000;
const url = `http://localhost:${PORT}/api/v1/users`;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/login`, { email, password });

    if (res.data.status) {
      location.assign(`/?${new Date().valueOf()}`);
    }
  } catch (err) {
    const alert = new Alert({ type: 'error', msg: err.response.data.message });
  }
};

export const logout = async () => {
  try {
    const res = await axios({ method: 'GET', url: `${url}/logout` });

    if (res.data.status === 'success') {
      location.assign(`/?${new Date().valueOf()}`);
    }
  } catch (err) {
    console.log(err.response);
  }
};
