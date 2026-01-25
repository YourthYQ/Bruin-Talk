# <img src="./bruin-image.png" width=30px height=35px> Bruin Talk

**Bruin Talk** is a full-stack, real-time web chat application—similar in scope to a lightweight Slack or Discord—built from scratch to demonstrate end-to-end software engineering: frontend, REST + WebSockets, relational database, auth, and deployment-ready configuration.

Users can register, log in, add and remove friends, and send instant messages. Chat history is stored and searchable. The app supports light/dark theme and shows friends’ online/offline status. Friend requests use an approve/deny flow. All of this runs in the browser with no page refresh for new messages.

- **Full-stack**: React (client) + Express (API) + MySQL (via Sequelize). Clear separation of routes, services, and data access.
- **Real-time**: Socket.IO for live messaging and presence; no polling.
- **Auth & security**: JWT-based auth, bcrypt for passwords, env-based config (no secrets in repo), and constrained CORS.
- **Production habits**: Environment variables for DB and secrets, `.env.example` for onboarding, and a Makefile/scripts to run and deps.

**Run locally**: `make run` then open `http://localhost:3000` (see [Getting Started](#getting-started)).

> Best on Chrome or Firefox. Safari may behave inconsistently. — *Jan–Mar 2024*

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
  - [MySQL Database](#mysql-database)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Manual Commands](#manual-commands)
- [Usage](#usage)
- [Demo](#demo)
- [License](#license)

---

## Features

**Core**

- **Real-time chat** — Instant messaging via Socket.IO
- **Message history** — Load and search chat history
- **User authentication** — Registration and login with JWT; passwords hashed with bcrypt

**Additional**

1. **Theme** — Light / Dark mode on Login and Register pages  
2. **Friend list** — View contacts  
3. **Add friends** — Search users and send requests (with approve/deny)  
4. **Delete friends** — Remove friends from the list  
5. **Online/offline status** — Show status in the friend list  

---

## Tech Stack

| Layer      | Technologies                          |
|-----------|----------------------------------------|
| Frontend  | React, React Router, Ant Design, Socket.IO Client, Axios |
| Backend   | Express, Sequelize, MySQL2, Socket.IO, JWT, bcryptjs |
| Real-time | Socket.IO (port 4001)                  |

**Ports**

- Frontend (React): `http://localhost:3000`
- Backend (Express): `http://localhost:3001`
- Socket.IO: `http://localhost:4001`

---

## Getting Started

### Prerequisites

- **Node.js** — [https://nodejs.org](https://nodejs.org)
- **MySQL** — [https://www.mysql.com/downloads](https://www.mysql.com/downloads)

### Install Dependencies

```bash
git clone https://github.com/YourthYQ/Bruin-Talk.git
cd Bruin-Talk
make install_package
```

(or run `make run` once; it will install packages if needed)

### MySQL Database

1. Start MySQL and open the CLI:

   ```bash
   mysql -u root -p
   ```

2. Create a database:

   ```sql
   CREATE DATABASE chatroom;
   ```

3. (Optional) Create a dedicated user and grant privileges.

### Environment Variables

Secrets and connection settings are read from environment variables. **Do not commit `.env` or real credentials.**

**Backend** (`backend/`)

1. Copy the example file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit `backend/.env`:

   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=chatroom
   JWT_SECRET=your_jwt_secret_at_least_32_characters_long
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   ```

**Frontend** (`frontend/`)

1. Copy the example file:

   ```bash
   cp frontend/.env.example frontend/.env
   ```

2. Edit if needed (defaults are fine for local dev):

   ```env
   REACT_APP_SERVER_URL=http://localhost:3001/
   REACT_APP_SOCKET_URL=http://localhost:4001
   ```

### Running the Application

```bash
cd path/to/Bruin-Talk
make run
```

This starts the backend (Express + Socket.IO) and then the frontend (React).

- Open **http://localhost:3000** in your browser to use the app.
- Open the same URL in another browser or incognito window to test with a second user.

### Manual Commands

| Command            | Description                          |
|--------------------|--------------------------------------|
| `make install_npm` | Install Node/npm (if missing)        |
| `make check_npm`   | Check npm and install if needed      |
| `make install_package` | Install backend and frontend deps |
| `make close`       | Stop processes on 3000, 3001, 3306, 4001 |

---

## Usage

- **Theme** — Use the sun/moon button on Login or Register to switch Light/Dark.
- **Register** — Create an account on the Register page.
- **Log in** — Sign in with username and password.
- **Add friends** — Search by username in the sidebar and send a friend request; approve or deny via “Friend Request” in the header.
- **Chat** — Select a friend in the list to open the conversation; type and click Send. Messages and history load in real time.
- **Message history** — Use “Search Message History” in the chat area to search by keyword.
- **Friend list** — See all friends and their online/offline status in the sidebar.
- **Delete friend** — Use “Delete Friend” in the chat header (with confirmation).
- **Log out** — Click Logout in the header.

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.
