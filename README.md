# Kwaliti Jerseys

E-commerce platform for Nigerian football jerseys. Browse by league, build a cart with size and version options, and pay with Paystack.

**Live:** https://kwalitijerseys.vercel.app

![Kwaliti Jerseys homepage](docs/screenshots/homepage.png)

## Features

- Product catalogue with league filters and image galleries
- Cart with size, version and customization options, persisted across refreshes
- Wishlist for signed-in users, with optimistic UI updates
- Email and password authentication
- Paystack checkout with server-side payment verification and webhook handling
- Error monitoring with Sentry

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Client state | Redux Toolkit |
| Database | PostgreSQL (Neon in production) with Drizzle ORM |
| Auth | Better Auth |
| Payments | Paystack |
| Media | Cloudinary |
| Monitoring | Sentry |
| Hosting | Vercel |

## Engineering notes

- **Redux in the App Router.** The store is created per request (`makeStore`) inside a client `StoreProvider`, so server renders never share state between users. Hooks are typed once in `hooks.ts`.
- **Cart persistence without hydration mismatches.** The cart slice starts empty on the server and the client. After mount, saved items are loaded from `localStorage`, and a store subscriber writes changes back.
- **Typed server action results.** Server actions return `Result<T>` (success with data, or failure with a message and code). One `handleActionError` helper returns user-safe messages for expected errors and reports unexpected ones to Sentry.
- **Payments.** Orders are created with Drizzle transactions. Payments are verified on the server and through a Paystack webhook with idempotency guards, so a repeated webhook cannot create duplicate orders.

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- A PostgreSQL database (local, or a hosted one such as Neon)

### Setup

```bash
git clone https://github.com/stackgik/kwaliti-jersey.git
cd kwaliti-jersey
npm install
```

Create `.env.local` in the project root (see [Environment variables](#environment-variables)), then create the tables and seed the products:

```bash
npx drizzle-kit push        # or: npx drizzle-kit migrate
npm run db:seed
npm run dev
```

The app runs at http://localhost:3000.

If `drizzle-kit` does not pick up `.env.local`, run it through `dotenv-cli`:

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions |
| `BETTER_AUTH_URL` | Base URL of the app |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key (client) |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (server, webhook verification) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image hosting |
| `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` | Error monitoring |

Never commit real values. `.env*` files are gitignored.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run db:seed` | Seed products and images (skips if products already exist) |

## Project structure

```
app/
  actions/        Server actions
  db/             Drizzle client, schema, seed script
  store/          Redux store, slices, typed hooks, providers
  ...             Routes and components
```

## Deployment

The app is deployed on Vercel with a Neon PostgreSQL database.

1. Set the environment variables above in Vercel (Settings, Environment Variables) for **Production**.
2. Use Neon's **pooled** connection string for `DATABASE_URL` at runtime. Use the **direct** connection string for migrations and seeding.
3. Redeploy after changing environment variables, since they only apply to new builds.

## Project status

> [!NOTE]
> This project is still in progress. The product images and other assets on the live site are placeholders for demonstration only. Real product photos are being uploaded to Cloudinary and will be added to the live website soon.


## Author

Built by Doyin Adeyemo. [GitHub](https://github.com/stackgik)