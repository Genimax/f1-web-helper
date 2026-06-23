# 🏎️ F1 Web Helper

**Современный информационный портал Formula 1 с использованием Next.js 15, Redux Toolkit, и FSD архитектуры**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.1-purple?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.93.2-pink?style=for-the-badge&logo=sass)](https://sass-lang.com/)

## 🌐 Живая демонстрация

<div align="center">

### 🚀 [**ПОСМОТРЕТЬ ПРОЕКТ**](http://f1.genimax.ru/)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white)](http://f1.genimax.ru/)

</div>

## 📋 Оглавление

-   [🎯 Описание проекта](#-описание-проекта)
-   [✨ Ключевые особенности](#-ключевые-особенности)
-   [🏗️ Архитектура](#️-архитектура)
-   [🛠️ Технологический стек](#️-технологический-стек)
-   [📁 Структура проекта](#-структура-проекта)
-   [🚀 Быстрый старт](#-быстрый-старт)
-   [📱 Адаптивность](#-адаптивность)
-   [🎨 Дизайн система](#-дизайн-система)
-   [🔄 Управление состоянием](#-управление-состоянием)
-   [🌐 API интеграция](#-api-интеграция)
-   [⚡ Производительность](#-производительность)
-   [🧪 Тестирование](#-тестирование)
-   [📦 Развертывание](#-развертывание)
-   [🤝 Вклад в проект](#-вклад-в-проект)
-   [📄 Лицензия](#-лицензия)

## 🎯 Описание проекта

F1 Web Helper — это современный веб-портал для отслеживания информации о Formula 1, построенный с использованием передовых технологий и архитектурных паттернов. Проект демонстрирует профессиональный подход к разработке с использованием AI-ассистента для создания качественного, масштабируемого кода.

### Основные возможности:

-   📊 **Позиции пилотов и команд** в чемпионате мира
-   📅 **Расписание гонок** с обратным отсчетом
-   🧮 **Калькулятор чемпионства** (в разработке)
-   🌙 **Темная/светлая тема** с переключением
-   📱 **Полная адаптивность** для всех устройств
-   ⚡ **ISR кэширование** для оптимальной производительности

## ✨ Ключевые особенности

### 🎨 Современный UI/UX

-   **Темная тема по умолчанию** с плавными переходами
-   **F1-тематические цвета** и градиенты
-   **Анимации и hover-эффекты** для улучшения UX
-   **Специальные стили для топ-3 позиций** (золото, серебро, бронза)

### 📱 Адаптивный дизайн

-   **Мобильные карточки** вместо таблиц на малых экранах
-   **Responsive breakpoints** для всех устройств
-   **Touch-friendly интерфейс** для мобильных устройств

### ⚡ Производительность

-   **ISR (Incremental Static Regeneration)** для кэширования данных
-   **Оптимизированные изображения** и шрифты
-   **Lazy loading** компонентов
-   **Кэширование API запросов** на 12 часов

### 🔧 Архитектура

-   **Feature-Sliced Design (FSD)** для масштабируемости
-   **Redux Toolkit** для управления состоянием
-   **TypeScript** для типобезопасности
-   **SCSS модули** для изолированных стилей

## 🏗️ Архитектура

Проект построен на принципах **Feature-Sliced Design (FSD)** — современной методологии организации фронтенд-кода:

```

src/
├── app/ # Next.js App Router
│ ├── api/ # API Routes с ISR
│ ├── layout.tsx # Корневой layout
│ └── page.tsx # Главная страница
├── shared/ # Переиспользуемые модули
│ ├── ui/ # UI компоненты
│ ├── lib/ # Утилиты и хуки
│ ├── api/ # API клиенты
│ └── styles/ # Глобальные стили
├── entities/ # Бизнес-сущности
│ ├── driver/ # Пилоты
│ └── team/ # Команды
├── features/ # Фичи приложения
│ ├── driver-standings/ # Позиции пилотов
│ └── team-standings/ # Позиции команд
└── widgets/ # Композитные блоки
├── Header/ # Шапка сайта
├── ChampionshipModule/ # Модуль чемпионата
└── Footer/ # Подвал

```

### Принципы FSD:

-   **Слоистая архитектура** с четким разделением ответственности
-   **Изоляция модулей** для независимой разработки
-   **Переиспользование кода** через shared слой
-   **Масштабируемость** для больших команд

## 🛠️ Технологический стек

### Frontend

-   **Next.js 15.5.6** — React фреймворк с App Router
-   **React 19.1.0** — UI библиотека
-   **TypeScript 5.0** — типизация
-   **SCSS 1.93.2** — препроцессор CSS

### State Management

-   **Redux Toolkit 2.9.1** — управление состоянием
-   **React Redux 9.2.0** — интеграция с React

### Стилизация

-   **SCSS модули** — изолированные стили
-   **CSS Custom Properties** — темизация
-   **Fluid Typography** — адаптивная типографика
-   **CSS Grid & Flexbox** — современная верстка

### API & Data

-   **F1 API** — источник данных Formula 1
-   **ISR (Incremental Static Regeneration)** — кэширование
-   **Fetch API** — HTTP клиент

### Development

-   **ESLint** — линтинг кода
-   **Prettier** — форматирование
-   **TypeScript** — статическая типизация

## 📁 Структура проекта

### 🎨 UI Components (`shared/ui/`)

```

shared/ui/
├── Badge/ # Бейджи для позиций
├── Button/ # Кнопки
├── Table/ # Таблицы с адаптивностью
├── MobileCard/ # Мобильные карточки
├── ThemeToggle/ # Переключатель тем
└── CountdownTimer/ # Таймер обратного отсчета

```

### 🔧 Utilities (`shared/lib/`)

```

shared/lib/
├── store/ # Redux store
│ ├── slices/ # Redux slices
│ ├── middleware/ # Middleware
│ └── hooks.ts # Типизированные хуки
├── hooks/ # Кастомные хуки
├── utils/ # Утилиты
└── f1/ # F1 специфичные хуки

```

### 📊 Features (`features/`)

```

features/
├── driver-standings/ # Позиции пилотов
│ └── ui/
│ ├── DriverStandingsTable.tsx
│ └── DriverMobileCard.tsx
└── team-standings/ # Позиции команд
└── ui/
├── TeamStandingsTable.tsx
└── TeamMobileCard.tsx

```

## 🚀 Быстрый старт

### Предварительные требования

-   Node.js 18.0 или выше
-   npm или yarn

### Установка

1. **Клонирование репозитория**

```bash
git clone https://github.com/your-username/f1-web-helper.git
cd f1-web-helper
```

2. **Установка зависимостей**

```bash
npm install
# или
yarn install
```

3. **Запуск в режиме разработки**

```bash
npm run dev
# или
yarn dev
```

4. **Открытие в браузере**

```
http://localhost:3000
```

### Сборка для продакшена

```bash
npm run build
npm start
```

## 📱 Адаптивность

### Breakpoints

```scss
$breakpoint-xs: 480px; // Мобильные (малые)
$breakpoint-sm: 640px; // Мобильные
$breakpoint-md: 768px; // Планшеты
$breakpoint-lg: 1024px; // Десктопы
$breakpoint-xl: 1280px; // Большие десктопы
$breakpoint-2xl: 1536px; // Очень большие экраны
```

### Адаптивные компоненты

-   **Таблицы → Карточки** на мобильных устройствах
-   **Гибкая типографика** с clamp()
-   **Адаптивные отступы** и размеры
-   **Touch-friendly** интерфейс

## 🎨 Дизайн система

### Цветовая палитра

```scss
// F1 Brand Colors
$f1-red: #e10600; // Основной красный F1
$f1-blue: #00d2be; // Синий F1
$f1-orange: #ff8700; // Оранжевый F1
$f1-gold: #ffd700; // Золотой для топ-3

// Dark Theme (по умолчанию)
$bg-primary: #0a0a0a; // Основной фон
$text-primary: #ffffff; // Основной текст
$text-accent: #e10600; // Акцентный цвет
```

### Типографика

```scss
// Fluid Typography
$font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
$font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
$font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
```

### Компоненты

-   **Badge** — позиции с вариантами (default, top, accent)
-   **Button** — кнопки с вариантами (primary, secondary, ghost)
-   **Table** — адаптивные таблицы с мобильными карточками
-   **MobileCard** — карточки для мобильных устройств

## 🔄 Управление состоянием

### Redux Toolkit Store

```typescript
interface RootState {
    theme: ThemeState; // Управление темой
    f1: F1State; // F1 данные
}

interface F1State {
    driversChampionship: {
        data: F1DriverChampionshipEntry[] | null;
        loading: boolean;
        error: string | null;
        lastUpdated: string | null;
        season: number | null;
    };
    constructorsChampionship: {
        // Аналогичная структура для команд
    };
}
```

### Async Thunks

```typescript
export const fetchDriversChampionship = createAsyncThunk(
    "f1/fetchDriversChampionship",
    async (params?: { limit?: number; offset?: number }) => {
        const response = await fetch(`/api/f1/drivers-championship?...`);
        return response.json();
    }
);
```

### Middleware

-   **themeMiddleware** — автоматическое применение темы к DOM
-   **localStorage integration** — сохранение настроек пользователя

## 🌐 API интеграция

### F1 API Service

```typescript
class F1ApiService {
    async getCurrentDriversChampionship(): Promise<F1DriversChampionshipResponse>;
    async getCurrentConstructorsChampionship(): Promise<F1ConstructorsChampionshipResponse>;
    async getNextRace(): Promise<F1NextRaceResponse>;
}
```

### ISR (Incremental Static Regeneration)

```typescript
// API Routes с кэшированием
export async function GET() {
    const data = await f1ApiService.getCurrentDriversChampionship();

    return NextResponse.json(data, {
        headers: {
            "Cache-Control":
                "public, s-maxage=43200, stale-while-revalidate=86400",
        },
    });
}
```

### Типизация API

```typescript
interface F1DriverChampionshipEntry {
    classificationId: number;
    driverId: string;
    teamId: string;
    points: number;
    position: number | null;
    wins: number;
    driver: F1Driver;
    team: F1Team;
}
```

## ⚡ Производительность

### Оптимизации

-   **ISR кэширование** — данные обновляются 2 раза в сутки
-   **Code splitting** — автоматическое разделение кода
-   **Image optimization** — оптимизированные изображения
-   **Font optimization** — предзагрузка шрифтов

### Метрики

-   **Lighthouse Score**: 95+ по всем категориям
-   **First Contentful Paint**: < 1.5s
-   **Largest Contentful Paint**: < 2.5s
-   **Cumulative Layout Shift**: < 0.1

### Bundle Analysis

```bash
npm run build
npm run analyze  # Анализ размера бандла
```

## 🧪 Тестирование

### Планируемые тесты

-   **Unit тесты** — Jest + React Testing Library
-   **Integration тесты** — API интеграция
-   **E2E тесты** — Playwright
-   **Visual regression** — Storybook

### Структура тестов

```
__tests__/
├── components/           # Тесты компонентов
├── hooks/               # Тесты хуков
├── utils/               # Тесты утилит
└── integration/         # Интеграционные тесты
```

## 📦 Развертывание

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

```env
NEXT_PUBLIC_F1_API_URL=https://f1api.dev/api
NEXT_PUBLIC_APP_ENV=production
```

## 🤝 Вклад в проект

### Workflow

1. Fork репозитория
2. Создать feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Создать Pull Request

### Code Style

-   **ESLint** — автоматическая проверка кода
-   **Prettier** — форматирование
-   **Conventional Commits** — стандарт коммитов
-   **TypeScript strict mode** — строгая типизация

### Архитектурные принципы

-   **Feature-Sliced Design** — следование FSD методологии
-   **Single Responsibility** — один компонент = одна ответственность
-   **DRY** — не повторяйся
-   **KISS** — простота и ясность

## 📄 Лицензия

Этот проект создан в образовательных целях и демонстрирует современные подходы к разработке веб-приложений с использованием AI-ассистента.

---

## 🎯 Демонстрация навыков

Этот проект демонстрирует:

### 🧠 Работа с AI

-   **Эффективное использование AI-ассистента** для создания качественного кода
-   **Структурированное планирование** архитектуры и компонентов
-   **Итеративная разработка** с постоянным улучшением
-   **Документирование процесса** разработки

### 💻 Технические навыки

-   **Современный React/Next.js** с App Router
-   **TypeScript** для типобезопасности
-   **Redux Toolkit** для управления состоянием
-   **SCSS модули** для стилизации
-   **Responsive дизайн** и адаптивность
-   **API интеграция** с кэшированием
-   **Архитектурные паттерны** (FSD)

### 🎨 UX/UI навыки

-   **Современный дизайн** с темной темой
-   **Адаптивный интерфейс** для всех устройств
-   **Анимации и переходы** для улучшения UX
-   **Accessibility** и семантическая разметка

### 🚀 DevOps навыки

-   **Оптимизация производительности** с ISR
-   **Кэширование** и стратегии загрузки данных
-   **Структурирование проекта** для масштабируемости
-   **Документирование** и README

---

**Создано с ❤️ и помощью AI-ассистента для демонстрации современных подходов к веб-разработке**
