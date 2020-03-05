import { PUBLIC_ID, onSuccess } from './index';

export default function pay(amount, email, e, name, data) {
  const widget = new cp.CloudPayments();
  widget.charge(
    {
      // options
      publicId: PUBLIC_ID, // id из личного кабинета
      description: 'Помощь ребятам на занятия спортом', // назначение
      amount, // сумма
      currency: 'RUB', // валюта
      invoiceId: '1234567', // номер заказа  (необязательно)
      accountId: email, // идентификатор плательщика (необязательно)
      email,
      skin: 'mini', // дизайн виджета
      data: {
        myProp: 'myProp value', // произвольный набор параметров
      },
      data,
    },
    function() {
      onSuccess(e, amount, email, name, data);
    },
    function() {
      alert('Ошибка оплаты, попробуйте еще раз');
    },
  );
}
