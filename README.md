# ZoGPT

ZoGPT is a full-stack AI chat application with a React + Vite frontend and an Express + MongoDB backend. The app lets users send prompts, keep chat thread history, and view previous conversations from a sidebar.

## Features

- AI chat experience in the browser
- Thread-based conversation history
- Sidebar for previous chats
- MongoDB-backed persistence for saved threads
- OpenRouter-powered model integration for responses

## Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Express, Mongoose, Node.js
- Database: MongoDB
- AI provider: OpenRouter

## Project Structure

- `Frontend/` — React application UI
- `Backend/` — Express server, routes, and Mongoose models

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+
- npm
- A MongoDB Atlas or local MongoDB instance
- An OpenRouter API key

## Local Setup

1. Install backend dependencies:

   ```bash
   cd Backend
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Update `Backend/.env` with your own values:

   ```env
   MDB_URL=your_mongodb_connection_string
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. Start the backend server:

   ```bash
   npx nodemon server.js
   ```

   The backend listens on `http://localhost:8181`.

5. In a second terminal, install and start the frontend:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

6. Open the frontend in your browser at the Vite URL shown in the terminal.

## Environment Variables

The backend expects the following environment variables in `Backend/.env`:

- `MDB_URL` — MongoDB connection string
- `OPENROUTER_API_KEY` — API key used by the OpenRouter integration

## Notes

- The frontend currently calls the backend at `http://localhost:8181/api/...`.
- Keep secrets out of version control. The repository ignores `.env` files via the root `.gitignore`.

## License

This project currently has no explicit license configured.
