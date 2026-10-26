# Hotel Bookings

A full-stack hotel booking web application built with React on the frontend and Express + MongoDB on the backend. The app supports hotel browsing, room booking, user authentication, hotel owner workflows, and payment handling.

## Features

- Browse available hotels and rooms
- View room details and amenities
- Book rooms for selected dates
- User authentication and account management via Clerk
- Hotel owner dashboard to add and manage rooms
- Image uploads via Cloudinary
- Email notifications through Nodemailer
- Secure payments through Stripe
- Responsive UI built with React + Vite + Tailwind CSS

## Tech Stack

Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- Clerk auth and webhooks
- Cloudinary
- Stripe
- Nodemailer

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
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas or local MongoDB instance
- Clerk account and project keys
- Cloudinary account
- Stripe account
- SMTP provider (Brevo/Sendinblue or similar)

### 1. Clone the repository

```bash
git clone https://github.com/jkaniish/hotel-bookings.git
cd hotel-bookings
```

### 2. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create `.env` files in both `client` and `server` based on the required keys used by the app.

Example for `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_EMAIL=your_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Example for `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

### 4. Run the app

Start the backend:

```bash
cd server
npm run start
```

Or with auto-reload:

```bash
npm run server
```

Start the frontend:

```bash
cd client
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:3000`.

## API Overview

The backend exposes routes under the following base paths:

- `/api/user`
- `/api/hotels`
- `/api/rooms`
- `/api/bookings`
- `/api/clerk`
- `/api/stripe`

## Scripts

Client:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Server:

```bash
npm run start
npm run server
```

## Deployment

This project includes `vercel.json` configuration for frontend and backend deployment on Vercel.

## Notes

- The app uses Clerk for authentication and webhook synchronization.
- Stripe webhooks are configured for payment event processing.
- Cloudinary is used for hotel/room image management.
- MongoDB stores hotels, rooms, bookings, and user-related data.

## License

This project does not currently declare a license in the repository, so usage rights are not formally specified. If needed, add a license file before publishing or distributing the project.

## Contributing

Contributions are welcome. If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Contact

If you want to reach the project owner or ask questions about the codebase, use the repository owner details from the GitHub profile associated with this project.
