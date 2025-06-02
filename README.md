
### Для работы нужно склонировать репозиторий
```
  git clone https://github.com/coffeequ/Pagtion
```
### Установка зависимостей
```
  npm install
```

### Сборка для разработки
```
  npm run dev
```

### Сборка для деплоя
```
  npm run buld
```

### файл .env:

- База данных: 
```
DATABASE_URL="postgresql://..."" <-- Ваша ссылка к базе данных
```
#### Также: 
- Для хранения файлов использовался сервис: Edge strore;
- Для авторизации использовались внешние провайдеры: Google, Yandex;
- Для отправки писем использовался SMTP от gmail;
- Для авторизации использовалаьс библиотека NextAuth.

### Настольная версия
Также доступна [настольная версия приложения](https://github.com/coffeequ/PagtionDesktop) с полной синхронизацией* заметок между сервисами.

* Синхронизация происходила за счет HTTP запросов к эндпоинтам сайта:
1. authenticate;
2. remoteSync.

Также были использовался Deep-link за счет страниц: electronRedirectOauth и electronAuth для авторизации через внешние провайдеры.

## Шаблон (На всякий случай пусть будет здесь)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
