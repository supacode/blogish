/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './auth';

// Select DOM Elements
export const elements = {
  loginForm: document.querySelector('#login-form'),
  logoutBtn: document.querySelector('.logout__btn')
};

// Dispatch Actions
if (elements.loginForm) {
  elements.loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const { email, password } = elements.loginForm;

    login(email.value, password.value);
  });
}

if (elements.logoutBtn) {
  elements.logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
