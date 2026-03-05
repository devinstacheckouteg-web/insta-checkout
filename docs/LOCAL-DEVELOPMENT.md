# Local Development Commands

Use these commands to run InstaCheckout locally.

## 1) Start backend dependencies (MongoDB)

Preferred on macOS (Homebrew):

```bash
brew services start mongodb/brew/mongodb-community@8.0
```

Alternative (Docker):

```bash
docker compose up -d mongodb
```

## 2) Start apps

Run each service in its own terminal:

```bash
npx pnpm --filter landing dev
npx pnpm --filter checkout dev
MONGODB_URI=mongodb://localhost:27017/instacheckout npx pnpm --filter backend dev
```

One-command backend start (recommended):

```bash
brew services start mongodb/brew/mongodb-community@8.0 && MONGODB_URI=mongodb://localhost:27017/instacheckout npx pnpm --filter backend dev
```

## 3) Optional checks

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/health/db
```

## 4) Stop services

- Stop frontend/backend terminals with Ctrl+C.
- Stop MongoDB service (Homebrew):

```bash
brew services stop mongodb/brew/mongodb-community@8.0
```

- Or stop MongoDB container (Docker):

```bash
docker compose down
```
