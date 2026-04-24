# CaloryInsight

A full-stack health and fitness web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Track your calorie burns, calculate BMI, and discover nutrition facts for everyday foods.

## Features

- **User Authentication** — Register and login with JWT-based authentication. Passwords are hashed with bcrypt.
- **Calorie Burn Calculator** — Estimate calories burned during 10 different exercise types using the MET formula.
- **BMI Calculator** — Calculate your Body Mass Index and see which WHO category you fall into.
- **Food Calorie Finder** — Search a database of 50+ foods to check calories, protein, carbs, fat, and fiber per 100g.
- **Dashboard** — View your calculation history, recent activity, and health tips.
- **Profile Management** — Update your personal details (age, weight, height, gender).
- **Responsive Design** — Works on desktop, tablet, and mobile devices.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React.js, React Router, Axios       |
| Styling   | Tailwind CSS                        |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB, Mongoose                   |
| Auth      | JWT (jsonwebtoken), bcryptjs         |
| Tooling   | Vite, PostCSS, Autoprefixer         |

## Folder Structure

```
CaloryInsight/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Auth context (React Context API)
│   │   ├── pages/            # Page components
│   │   └── utils/            # API helper
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                  # Express backend
│   ├── config/               # Database connection
│   ├── controllers/          # Route handlers
│   ├── data/                 # Static food dataset
│   ├── middleware/            # Auth & error middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── utils/                # Seed script
│   └── server.js
│
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or a MongoDB Atlas URI)
- npm

## Setup Instructions

### 1. Clone the project

```bash
cd CaloryInsight
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (you can copy from `.env.example`):

```env
MONGO_URI=mongodb://localhost:27017/caloryinsight
JWT_SECRET=your_secret_key_change_this
PORT=5000
```

Seed the food database:

```bash
npm run seed
```

Start the server:

```bash
npm start
```

The API will be running at `http://localhost:5000`.

### 3. Setup the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:3000`.

### 4. Open in browser

Go to `http://localhost:3000` to use the application.

## API Endpoints

### Auth
| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | /api/auth/register   | Register new user   |
| POST   | /api/auth/login      | Login user          |

### Calculator (Protected)
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /api/calc/calorie-burn | Calculate calories burned |
| POST   | /api/calc/bmi          | Calculate BMI             |
| GET    | /api/calc/food-search  | Search food items         |
| GET    | /api/calc/history      | Get user's history        |

### User (Protected)
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | /api/user/profile   | Get user profile   |
| PUT    | /api/user/profile   | Update profile     |

## Environment Variables

| Variable   | Description                        |
|------------|------------------------------------|
| MONGO_URI  | MongoDB connection string          |
| JWT_SECRET | Secret key for signing JWT tokens  |
| PORT       | Server port (default: 5000)        |
