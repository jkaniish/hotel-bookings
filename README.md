# Hotel Bookings

A full-stack hotel booking platform for travelers and hotel owners. Guests can browse available rooms, view details, and complete bookings, while property owners can manage listings, room inventory, and booking data through a dedicated dashboard.

## Overview

Hotel Bookings is built as a split-stack application:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Authentication: Clerk
- Payments: Stripe
- Media storage: Cloudinary
- Email notifications: Nodemailer

The app includes a public customer-facing experience and a hotel-owner management area, making it a practical booking and property management solution.

## Features

- Search and browse hotel listings and available rooms
- View detailed room information with pricing and amenities
- Book rooms for a selected date range
- Track personal bookings in a user dashboard
- Secure authentication and user management via Clerk
- Hotel owner dashboard to manage property data and rooms
- Add room listings with image uploads through Cloudinary
- Receive booking-related email notifications
- Accept payments using Stripe integration
- Responsive UI for desktop and mobile screens

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- Clerk Auth / Webhooks
- Stripe
- Cloudinary
- Nodemailer
- CORS + dotenv

## Project Structure

```text
hotel-bookings/
├── client/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
├── .gitignore
├── README.md
└── package-lock.json
```

## Core App Flow

### Customer experience
- Home page with hotel/room discovery
- Room detail page for availability and pricing
- Booking flow for selected rooms/dates
- My Bookings tab to review past/current reservations

### Hotel owner experience
- Secure owner route at `/owner`
- Dashboard overview
- Add-room form
- List/manage existing rooms

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18 or later
- npm
- MongoDB Atlas account or a local MongoDB instance
- Clerk account and API keys
- Cloudinary account
- Stripe account
- SMTP/email provider for notifications

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jkaniish/hotel-bookings.git
cd hotel-bookings
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create an environment file in the `server` directory named `.env` with the values needed by the app:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_EMAIL=your_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

The frontend also uses a client-side environment file for Vite-based config:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

## Running the Project

### Start the backend

```bash
cd server
npm run start
```

Or use nodemon during development:

```bash
npm run server
```

### Start the frontend

```bash
cd client
npm run dev
```

The client typically runs at:
- http://localhost:5173

The server typically runs at:
- http://localhost:3000

## API Structure

The backend exposes the following route groups:

- `/api/user`
- `/api/hotels`
- `/api/rooms`
- `/api/bookings`
- `/api/clerk`
- `/api/stripe`

## Scripts

### Client scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Server scripts

```bash
npm run start
npm run server
```

## Deployment Notes

This project includes Vercel configuration files in both the frontend and backend directories, making it suitable for deployment on Vercel with environment variables configured in the deployment dashboard.

## License

This repository does not currently include a license file. If you plan to publish or distribute the project publicly, consider adding an open-source license such as MIT.

## Contribution

Contributions are welcome. If you want to improve the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push your branch
5. Open a pull request

## Project Owner

GitHub: https://github.com/jkaniish
