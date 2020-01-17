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

// .then(res => {
//       const currentSum = res.donations.reduce((acc, item) => {
//         return acc + item.amount;
//       }, 0);
//       const progressBar = document.querySelector(
//         '.form__donation-bar-progress',
//       );
//       const currentSumDOM = document.querySelector(
//         '.form__donation-sum-current',
//       );
//       const maxSumDOM = document.querySelector('.form__donation-sum-max');
//       const maxSum = Number(maxSumDOM.textContent);
//       console.log(maxSum);
//       if (currentSum <= maxSum) {
//         progressBar.style.width = `${(currentSum * 100) / maxSum}%`;
//         currentSumDOM.textContent = currentSum.toLocaleString();
//       } else {
//         progressBar.style.width = `100%`;
//         currentSumDOM.textContent = maxSum.toLocaleString();
//       }
//       maxSumDOM.textContent = maxSum.toLocaleString();
//     })
