export default function pay(amount, email, e, data) {
  const widget = new cp.CloudPayments();
  widget.charge(
    {
      // options
      publicId: 'test_api_00000000000000000000001', // id из личного кабинета
      description: 'Пример оплаты (деньги сниматься не будут)', // назначение
      amount, // сумма
      currency: 'RUB', // валюта
      invoiceId: '1234567', // номер заказа  (необязательно)
      accountId: email, // идентификатор плательщика (необязательно)
      skin: 'mini', // дизайн виджета
      data: {
        myProp: 'myProp value', // произвольный набор параметров
      },
      data,
    },
    function() {
      window.popup.onSuccess(e);
    },
    function() {
      alert('Ошибка оплаты, попробуйте еще раз');
    },
  );
}
