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

  addDonation(amount, email, name, data) {
    return fetch(`${this.baseUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        donation: {
          name,
          email,
          amount,
          date: new Date().toLocaleString('ru-RU'),
          type: data ? 'рекуррентный' : 'разовый',
        },
      }),
      headers: this.headers,
    }).then(res => {
      this.getJSONResponse(res);
    });
  }
}
