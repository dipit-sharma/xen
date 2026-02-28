# 🔵 REPO 2: xen-server

### Tech Stack

- Node.js
- Express
- Socket.io
- Redis (optional for scaling)
- Google Directions API

---

## Responsibilities

- Route fetching proxy
- WebSocket relay
- Session management
- Device pairing
- Authentication
- Rate limiting

---

## Functional Requirements

### REST APIs

#### POST /route

- Input: origin, destination
- Calls Google Directions API
- Returns cleaned route JSON

#### POST /session/start

- Creates ride session
- Returns sessionId

---

### WebSocket Layer

- Bike connects with sessionId
- Phone connects with sessionId
- Server maps them
- Relay navigation updates
- Send heartbeat
- Auto cleanup on disconnect

---

### Data Contract

Navigation payload:

```json
{
  "sessionId": "abc123",
  "turn": "LEFT",
  "distance": 120,
  "eta": "18:42",
  "stepIndex": 3
}
```

---

## Non-Functional Requirements

- Low latency (<200ms relay)
- Reconnection handling
- Horizontal scalability
- TLS encryption (HTTPS/WSS)
- Google API quota handling

---

# 📦 Folder Structure Example

xen-server/

- controllers/
- routes/
- services/
- sockets/
- middleware/

---
