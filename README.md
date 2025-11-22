# Тестовое задание — Frontend Разработчик

Проект реализует три задания:
- **Задание A**: Мини-SPA «Пользователи» с поиском, деталями и редактированием
- **Задание B**: Рефакторинг легаси-кода «Счета» (убрана jQuery, добавлен TypeScript)
- **Задание C**: Виджет пользователей как подключаемый модуль (UMD)

## Технологии

- Vue 3 + TypeScript
- Vite (сборщик)
- Pinia (управление состоянием)
- Vue Router (маршрутизация)
- Axios (HTTP-клиент)
- Vitest (тестирование)

## Структура проекта

```
src/
├── components/       # Переиспользуемые компоненты
│   ├── AppButton.vue
│   ├── AppInput.vue
│   ├── AppModal.vue
│   ├── UserTable.vue
│   ├── LoadingSpinner.vue
│   └── ErrorMessage.vue
├── pages/           # Страницы приложения
│   ├── UsersPage.vue
│   └── InvoicesPage.vue
├── store/           # Pinia stores
│   ├── users.ts
│   └── invoices.ts
├── services/        # API сервисы
│   ├── api.ts
│   └── invoices.ts
├── types/           # TypeScript типы
│   ├── user.ts
│   └── invoice.ts
├── utils/           # Утилиты
│   ├── formatAmount.ts
│   └── __tests__/
├── widget/          # Виджет (задание C)
│   ├── UsersWidget.vue
│   ├── index.ts
│   └── styles.css
├── router/          # Маршрутизация
│   └── index.ts
├── App.vue
└── main.ts
```

## Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Сборка для production

```bash
npm run build
```

### Предпросмотр production сборки

```bash
npm run preview
```

### Запуск через Docker

```bash
docker build -t testovoe-frontend .
docker run -p 3000:3000 testovoe-frontend
```

Приложение будет доступно по адресу: http://localhost:3000

### Сборка виджета (задание C)

```bash
npm run build:widget
```

Виджет будет собран в `dist-widget/users-widget.umd.js`

### Запуск тестов

```bash
npm run test
```

## Задание A — Мини-SPA «Пользователи»

### Реализованный функционал:

1. **Список пользователей**
   - Загрузка данных с API (jsonplaceholder.typicode.com/users)
   - Отображение: имя, email, компания, город
   - Поиск/фильтр по имени или email (клиентская фильтрация)

2. **Детальная карточка**
   - Модальное окно с деталями пользователя
   - Отображение: адрес, сайт, телефон, компания

3. **Редактирование**
   - Форма изменения данных (имя, email, телефон)
   - Валидация полей
   - Сохранение через PUT-запрос к API

4. **UX**
   - Индикаторы загрузки
   - Обработка и отображение ошибок
   - Кнопка «Обновить» для перезапроса данных

### Технические детали:

- Использован Pinia для управления состоянием
- API-вызовы вынесены в `services/api.ts`
- Переиспользуемые компоненты: `AppButton`, `AppInput`, `AppModal`, `UserTable`
- Адаптивная верстка

## Задание B — Рефакторинг легаси-кода «Счета»

### Что было сделано:

1. ✅ Переписано на TypeScript (Vue 3 + TS)
2. ✅ Убрана jQuery, используется `fetch` в `services/invoices.ts`
3. ✅ Добавлены индикаторы загрузки и ошибок
4. ✅ Типы вынесены в `types/invoice.ts`
5. ✅ Утилита `formatAmount` вынесена в `utils/formatAmount.ts`
6. ✅ Реализованы поиск и сортировка
7. ✅ Убраны прямые манипуляции DOM
8. ✅ Добавлен тест для форматирования суммы

### Улучшения:

- Сортировка по всем полям (клик по заголовку таблицы)
- Поиск по номеру счета и клиенту
- Статусы с цветовой индикацией
- Адаптивная таблица

## Задание C — Виджет пользователей

### Реализация:

Виджет реализован как UMD-бандл, который можно подключить на любую HTML-страницу.

### Использование:

1. Соберите виджет:
```bash
npm run build:widget
```

2. Подключите на страницу:
```html
<div id="users-widget-container"></div>
<script src="path/to/users-widget.umd.js"></script>
<script>
  window.UsersWidget.init('#users-widget-container');
</script>
```

### Демо:

После сборки виджета используйте один из вариантов:

**Вариант 1: Standalone демо**
```bash
npm run build:widget
# Откройте demo-standalone.html в браузере
```

**Вариант 2: Через Vite preview**
```bash
npm run build:widget
npm run preview
# Откройте http://localhost:4173/demo.html
```

### API виджета:

```javascript
window.UsersWidget.init(containerSelector | HTMLElement)
window.UsersWidget.destroy()
```

## Тесты

Реализован тест для утилиты форматирования суммы (`formatAmount`):

```bash
npm run test
```

## Решения и компромиссы

### Архитектурные решения:

1. **Vue 3 Composition API**: Использован для лучшей типизации и переиспользования логики
2. **Pinia вместо Vuex**: Более современное и простое решение для Vue 3
3. **Разделение на слои**: Четкое разделение на components, pages, store, services, types
4. **Переиспользуемые компоненты**: Созданы базовые компоненты (Button, Input, Modal) для консистентности UI

### Компромиссы:

1. **Виджет**: Реализован через UMD вместо Web Component для простоты интеграции
2. **Стили виджета**: Используется изоляция через scoped styles, но можно улучшить через Shadow DOM
3. **Тесты**: Пока только unit-тесты для утилит, можно расширить покрытие компонентов

## Дополнительно

- Все компоненты адаптивны и работают на мобильных устройствах
- Код следует принципам чистого кода и TypeScript best practices
- Обработка ошибок на всех уровнях (API, валидация, UI)

