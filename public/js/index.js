/*eslint-disable*/
import '@babel/polyfill';

import { login } from './login';

// Select DOM Elements
const loginForm = document.querySelector('#login-form');

// Dispatch Actions
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const { email, password } = loginForm;

    login(email.value, password.value);
  });
}
