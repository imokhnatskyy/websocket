# Websocket Service Backend

## Overview
A real-time chat backend built with **ExpressJS** and **Socket.IO**, featuring:
- Private and group chat rooms.
- **MongoDB** for message storage.
- **Redis** for caching online users and scaling with Socket.IO adapter.
- **Docker Compose** for running Node.js, MongoDB, and Redis.
- **Hot-reload with nodemon** for development.


## Technologies
- Node.js 20+
- ExpressJS
- Socket.IO
- MongoDB
- Redis
- Docker & Docker Compose


## Project Setup

### Clone and Install
```sh
git clone <your-repo>
cd <your-repo>
npm install
```


## Development (with Hot Reload)
```sh
docker-compose up --build
```

## Production Build
```sh
docker-compose -f docker-compose.yml up --build -d
```

### API Endpoints
POST /api/register – Register a new user.

POST /api/login – Login and receive a JWT token.

GET /health – Health check.


### WebSocket Events
room:join – Join a chat room.

room:leave – Leave a chat room.

room:message – Send/receive messages.

users:online – Get online users list.

server:ping / client:pong – Heartbeat check.