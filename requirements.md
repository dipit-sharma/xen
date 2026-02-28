# 🟢 REPO: xen-web

### Tech Stack

- (Vite + React)
- TypeScript
- Google Directions API
- WebSocket client

---

## Responsibilities

- Accept destination input
- Fetch route from xen-server
- Parse route steps
- Determine next instruction
- Send real-time updates via WebSocket
- Handle reconnection
- Maintain ride session

---

## Functional Requirements

### Navigation

- User enters destination
- Call xen-server `/route`
- Display basic route summary
- Extract steps[] from response
- Track current step index

### Turn Processing

- Normalize instructions:
  - LEFT
  - RIGHT
  - STRAIGHT
  - UTURN
  - ROUNDABOUT

- Convert meters properly
- Calculate ETA

### WebSocket

- Connect to server
- Send session ID
- Send navigation updates every 2–3 sec
- Handle disconnect/reconnect

### UI

- Minimal UI
- Big start button
- Stop navigation
- Show connection status

---

## Non-Functional Requirements

- Mobile-first design
- Works on Safari (iOS)
- Fast loading
- Secure API key handling (never expose Google key)

---

# 📦 Folder Structure Example

xen-web/

- components/
- services/
- hooks/
- utils/
- types/

---
