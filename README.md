🏥 MediTrack — Clinic Appointment Portal

A full-stack clinic appointment portal built as part of the Week 7 · Session 14 — Authentication End to End practical assignment.

MediTrack allows patients to create accounts, securely log in, request appointments, view their own appointments, and cancel appointment requests. Staff members can manage the clinic schedule and update appointment statuses.

---

📌 Project Overview

MediTrack is a MERN-stack application focused on implementing authentication, authorization, protected routes, and appointment management.

The application uses JWT authentication with HttpOnly cookies, Redux Toolkit for client-side authentication and appointment state, Express for the backend API, and MongoDB for data storage.

---

✨ Features

👤 Authentication

- Patient registration
- Patient login
- Logout
- Current-user session checking
- JWT-based authentication
- HttpOnly authentication cookie
- Protected routes
- Role-based access control
- Forbidden page for unauthorized access

📅 Patient Appointments

- View personal appointments
- Request a new appointment
- View appointment date and time
- View appointment status
- Cancel an appointment

Patients can only access and manage their own appointment data.

👩‍⚕️ Staff Management

Staff users can:

- View the clinic appointment schedule
- See patient information
- Confirm appointments
- Cancel appointments

Staff-only operations are protected on the server as well as in the frontend.

---

🛠️ Tech Stack

Technology| Purpose
React| Frontend UI
Vite| Frontend development/build tool
Redux Toolkit| State management
React Router| Client-side routing
Node.js| Backend runtime
Express.js| REST API
MongoDB| Database
Mongoose| MongoDB object modeling
JWT| Authentication
HttpOnly Cookies| Secure session cookie
Axios| API requests

---

📂 Project Structure

meditrack/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── appointments/
│   │   └── routes/
│   │
│   └── package.json
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── screenshots/
├── .gitignore
├── README.md
└── REFLECTION.md

---

🔐 Authentication Flow

MediTrack uses JWT authentication with an HttpOnly cookie.

**Authentication Flow**
```text
User → React Login/Register → Express API → MongoDB → JWT → HttpOnly Cookie → Protected Routes → Dashboard/Staff Panel
```
The authentication flow prevents the JWT from being directly accessed by client-side JavaScript because the authentication token is stored in an HttpOnly cookie.

---

📊 System Architecture
React + Vite → Redux Toolkit → Axios → Express API → Authentication Middleware → MongoDB

---


🔗 API Routes

Method| Route| Access
POST| "/api/auth/register"| Public
POST| "/api/auth/login"| Public
GET| "/api/auth/me"| Logged in
POST| "/api/auth/logout"| Public
GET| "/api/appointments"| Logged in
POST| "/api/appointments"| Logged in
PUT| "/api/appointments/:id"| Owner only
DELETE| "/api/appointments/:id"| Owner only
GET| "/api/staff/appointments"| Staff only
PATCH| "/api/staff/appointments/:id/status"| Staff only

---

🖼️ Screenshots

Screenshots of the completed application can be placed in the "screenshots/" folder.

🔑 Login
![MediTrack Login](screenshots/sign%20in%20page.png)


📝 Register
![MediTrack Register](screenshots/register%20page.png)


📅 Patient Dashboard
![Patient Dashboard](screenshots/after%20registered.png)
![Patient Dashboard](screenshots/successfully%20booking%20appointment.png)


👩‍⚕️ Staff Panel
![staff Panel ](screenshots/register%20and%20sign%20in%20as%20staff%20after%20change%20role%20in%20mongodb.png)
![Staff Panel](screenshots/clinic%20schedule.png)
![Staff Panel](screenshots/checking%20clinic%20schedule.png)




---

⚙️ Installation & Setup

1. Clone the repository

git clone <your-github-repository-url>
cd meditrack

2. Backend setup

Open the server folder:

cd server
npm install

Create a ".env" file inside the "server/" folder.

Example:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/meditrack
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

«Never commit your ".env" file to GitHub.»

Start the backend:

npm run dev

The API runs at:

http://localhost:5000

Health check:

http://localhost:5000/api/health

---

💻 Frontend Setup

Open another terminal and go to the client folder:

cd client
npm install
npm run dev

The frontend runs at:

http://localhost:5173

---

🔑 Environment Variables

The backend requires the following environment variables:

Variable| Description
"PORT"| Backend server port
"MONGO_URI"| MongoDB connection URI
"JWT_SECRET"| Secret used for JWT authentication
"CLIENT_URL"| Frontend URL
"NODE_ENV"| Application environment

⚠️ Security

The ".env" file contains sensitive information and must never be committed to GitHub.

The repository should contain ".env.example", but not ".env".

---

👩‍⚕️ Creating a Staff Account

New users register as patients by default.

To create a staff account for testing:

1. Register a normal account.
2. Open the "users" collection in MongoDB.
3. Find the registered user.
4. Change the "role" from:

patient

to:

staff

5. Log in again with that account.
6. The staff-only clinic schedule becomes available.

Users cannot register themselves directly as staff.

---

🛡️ Route Protection

MediTrack uses two frontend route guards:

ProtectedRoute

Used for authenticated pages such as the patient dashboard.

Not logged in
      ↓
   /login

Logged in
      ↓
  /dashboard

RoleRoute

Used for staff-only pages.

Patient
   ↓
/forbidden

Staff
   ↓
/staff

The backend also enforces authorization, so frontend route protection is not the only security layer.

---

🎁 Bonus Tasks

Part 9 and other sections marked BONUS in the starter project are optional.

The project contains bonus tasks such as:

- Password reset request
- Password reset page
- Unauthorized response handling
- Helmet security headers
- Authentication rate limiting
- MongoDB sanitization

Only bonus tasks that have actually been implemented should be listed as completed.

---

🧪 Testing

The application can be tested by checking:

- Patient registration
- Patient login
- Logout
- Session persistence
- Protected dashboard access
- Appointment creation
- Appointment cancellation
- Patient appointment ownership
- Staff-only access
- Appointment status updates
- Forbidden access for unauthorized roles
- Backend API health endpoint

---

📤 Submission

The project is submitted through GitHub.

Before pushing, check:

git status

Make sure:

- "node_modules/" is not included
- ".env" is not included
- ".env.example" is included
- "client/" is included
- "server/" is included
- "README.md" is included
- "REFLECTION.md" is included

Then:

git add .
git commit -m "MediTrack auth assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/meditrack.git
git push -u origin main

---

📝 Reflection

The assignment reflection is provided separately in:

REFLECTION.md

It contains the required six reflection answers about the implementation and learning outcomes.

---

👩‍💻 Project

Project: MediTrack — Clinic Appointment Portal
Course: Week 7 · Session 14
Stack: MongoDB · Express · React · Redux Toolkit · Vite

Built as an authentication and authorization practical assignment.