# Лучшие друзья

Version: v.0.0.1

## Ссылка на проект gh-pages

https://tohaly.github.io/bestbuddies.github.io/


## Описание Проекта
Одностраничный сайт, на котором размещена компания по сбору средств на спортивные тренировки по волейболу и футболу для людей с нарушением развития и интеллекта.
Данный сайт разрабатывался в рамках конкурса, и был отобран как лучший. Призом была публикация проекта. 
Cсылка на проект https://sport.bestbuddies.ru/.
Данный сайт делался в команде с [Андрей Лапшов](https://github.com/andrewLapshov).

## Что было сделано мной в данном пректе

- Блоки Header, Lead, Description, Slder, Estimates;
- Логика header;
- YoutubeApi;
- Slider;
- Нативный скрол вверх.


## Используемые технологии:
- Верстка HTML, CSS, методология БЭМ;
- Логика: JavaScript;
- Сборщик: WebPack;
- Транспиляция: Babel;
- Кодстайлинг: Prettier, Eslint;
- E-commerce: [Сloudpayments](https://www.cloudpayments.ru/);
- Дополнительные библиотеки: [Tiny slider](https://github.com/ganlanyuan/tiny-slider);
- Остальное: Youtube API, [Для статус бара используется Sheety](https://sheety.co/);

## Использование
### Локальный запуск
1. Склонировать репозиторий
    ```
        git clone https://github.com/tohaly/bestbuddies.github.io.git
    ```
2. Доставить отсутствющие модули npm
    ```
        npm i
    ```
3. Запустить локальный сервер
    ```
        npm run dev
    ```

### Публикация на GitHub Pages
1. Сделать форк проекта
2. Склонировать репозиторий
    ```
        git clone https://github.com/tohaly/bestbuddies.github.io.git
    ```
3. Доставить отсутствующие модули npm
    ```
        npm i
    ```
4. Собрать проект
    ```
        npm run build
    ```
5. Запушить собранный проект на GitHub
    ```
        npm run deploy
    ```

### Внесение изменений
1. При необходимости, после внесения изменений, запустить тестирование
    ```
        npm run eslint
    ```
2. Для автоматического исправления можно воспользоваться командой:
    ```
        npm run eslintFix
    ```
