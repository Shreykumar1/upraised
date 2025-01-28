# IMF Gadget API

The **IMF Gadget API** is a secure API designed for managing the Impossible Missions Force's gadget inventory. It includes endpoints for authentication, gadget creation, retrieval, updates, and decommissioning. Additionally, it supports initiating self-destruct sequences for gadgets.

## Documentation
Refer to the `/docs` route for API documentation.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Authentication](#authentication)

---

## Features
- **Authentication**: Secure login with JWT token generation.
- **Gadget Inventory Management**:
  - Create, retrieve, update, and delete gadgets.
  - Filter gadgets by their status.
- **Self-Destruct**: Initiate a self-destruct sequence for any gadget.
- **Swagger Documentation**: API documentation available at `/docs`.

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v20.18.2)
- [npm](https://www.npmjs.com/) (v10.8)
- A running instance of a database compatible with [Prisma](https://www.prisma.io/) (e.g., PostgreSQL, MySQL).

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shreykumar1/upraised.git
   cd upraised
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory with the following values:
   ```bash
   DATABASE_URL=your_database_connection_string
   DIRECT_URL=your_direct_database_connection_string # Required if using Supabase
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

4. Setup Database using Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm run start
   ```


## Authentication
**Note:** Username & Password are static in this server.

1. Request Body:
   ```bash
   {
       "username": "imf",
       "password": "secret"
   }
   ```

2. Response:
   ```bash
   {
        "token": "your_jwt_token_here"
   }
   ```