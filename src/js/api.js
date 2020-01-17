export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.connectError = 'Ошибка :( Попробуйте еще раз';
  }

  getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSumInfo() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
    }).then(res => this.getJSONResponse(res));
  }

  addDonation(amount, email) {
    return fetch(`${this.baseUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        donation: {
          email,
          amount,
        },
      }),
      headers: this.headers,
    }).then(res => {
      this.getJSONResponse(res);
    });
  }
}
