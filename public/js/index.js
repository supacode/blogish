/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './auth';
import { togglePassword } from './authUI';

// Select DOM Elements
export const elements = {
  loginForm: document.querySelector('#login-form'),
  logoutBtn: document.querySelector('.logout__btn'),
  togglePassword: document.querySelector('.toggle-password')
};

// Dispatch Actions

// Toggle Password
if (elements.togglePassword) togglePassword();

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
