/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './auth';

// Select DOM Elements
const loginForm = document.querySelector('#login-form');

const logoutBtn = document.querySelector('.logout__btn');

// Dispatch Actions
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const { email, password } = loginForm;

    login(email.value, password.value);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
