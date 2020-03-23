import { elements } from './index';

const showPassword = el => {
  el.classList.add('fa-eye');
  el.setAttribute('title', 'Show Password');
  el.classList.remove('fa-eye-slash');
  const { password: passwordInput } = elements.loginForm;
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('data-status', 'shown');
};

const hidePassword = el => {
  el.setAttribute('title', 'Hide Password');
  el.classList.add('fa-eye-slash');
  el.classList.remove('fa-eye');
  const { password: passwordInput } = elements.loginForm;
  passwordInput.setAttribute('type', 'text');
  passwordInput.setAttribute('data-status', 'hidden');
};

export const togglePassword = () => {
  elements.togglePassword.addEventListener('click', e => {
    const { status: inputStatus } = elements.loginForm.password.dataset;

    if (inputStatus === 'shown') {
      return hidePassword(elements.togglePassword);
    }
    return showPassword(elements.togglePassword);
  });
};
