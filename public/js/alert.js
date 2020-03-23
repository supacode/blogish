/* eslint-disable */
export class Alert {
  constructor(alert = { type, msg }) {
    this.type = alert.type;
    this.msg = alert.msg;
    this.submitBtn = document.querySelector('.p-form__submit--wrapper');
    this.append();
  }

  append() {
    this.removeAlert();
    const html = `<div class="alert alert__${this.type}"> <p>${this.msg}</p> </div>`;
    this.submitBtn.insertAdjacentHTML('beforebegin', html);
  }

  removeAlert() {
    const alert = document.querySelector('.alert');
    if (alert) alert.parentElement.removeChild(alert);
  }
}
