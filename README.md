# Тестовое задание — NOMAD

## Что реализовано

### Задание A — Мини-SPA «Пользователи»
- Список пользователей с поиском по имени/email
- Детальная карточка в модальном окне (адрес, телефон, сайт)
- Редактирование данных с валидацией
- Индикаторы загрузки и обработка ошибок
- Кнопка обновления данных

### Задание B — Рефакторинг «Счета»
- Переписано на TypeScript (Vue 3)
- Убрана jQuery, используется fetch
- Добавлены индикаторы загрузки и ошибок
- Реализованы поиск и сортировка по полям
- Типы и утилиты вынесены в отдельные файлы
- Добавлен тест для форматирования суммы

### Задание C — Виджет пользователей
- UMD-бандл для подключения на любую HTML-страницу
- Демо-файлы для проверки работы

## Технологии

Vue 3 + TypeScript, Vite, Pinia, Vue Router, Axios, Vitest

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на http://localhost:3000

## Другие команды

```bash
npm run build          # Сборка для production
npm run build:widget   # Сборка виджета (задание C)
npm run test           # Запуск тестов
```

## Виджет (задание C)

После сборки виджета (`npm run build:widget`) можно подключить его на любую страницу:

```html
<div id="users-widget-container"></div>
<script src="dist-widget/users-widget.umd.js"></script>
<script>
  window.UsersWidget.init('#users-widget-container');
</script>
```

Демо: откройте `demo-standalone.html` после сборки виджета.

## Структура проекта

```
src/
├── components/    # Переиспользуемые компоненты
├── pages/         # Страницы приложения
├── store/         # Pinia stores
├── services/      # API сервисы
├── types/         # TypeScript типы
├── utils/         # Утилиты и тесты
└── widget/        # Виджет (задание C)
```

## Docker

```bash
docker build -t testovoe-frontend .
docker run -p 3000:3000 testovoe-frontend
```
