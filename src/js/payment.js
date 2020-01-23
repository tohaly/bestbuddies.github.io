import onSuccess from './index';
import config from './config';

export default function pay(amount, email, e, data) {
  const widget = new cp.CloudPayments();
  widget.charge(
    {
      // options
      publicId: config.payment.publicId, // id из личного кабинета
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
      onSuccess(e, amount, email);
    },
    function() {
      alert('Ошибка оплаты, попробуйте еще раз');
    },
  );
}
