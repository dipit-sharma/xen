# xen-server

Express-based backend for Xen navigation project.

## Features implemented

- POST `/route` proxy to Google Directions API
- POST `/session/start` creates a UUID session
- Socket.io relay: clients join with `sessionId` and `type` (`phone` or `bike`)
- Navigation events forwarded between paired sockets
- Basic error handling and health endpoint

## Setup

1. Create `.env` from `.env.example` and supply `GOOGLE_API_KEY` and `PORT`.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   npm start
   ```

### Architecture

```
server/
  src/
    controllers/   # request handlers
    routes/        # express routers
    services/      # external API logic
    sockets/       # socket.io setup and relay
    middleware/    # error handling, etc.
    app.ts         # entry point
  tsconfig.json
  package.json
  .env.example
```

Refer to the requirements in `requirements.md` for additional responsibilities and expected payload shapes.

---

This is a minimal scaffold; persistence, auth, rate limiting and Redis integration would be added later.
