# Employee Task & Complaint Tracker

A full-stack **MEAN stack** web application for managing employee tasks and internal complaints.

The system allows employees to raise tasks/complaints, while admins can assign tasks to staff members and track their progress.

## Tech Stack

* **MongoDB** – Database
* **Express.js** – Backend API
* **Angular** – Frontend
* **Node.js** – Server runtime
* **JWT** – Authentication
* **bcryptjs** – Password hashing

## Features

### Authentication

* Secure login using JWT
* Passwords are hashed using bcrypt
* Role-based access control
* Logout functionality

### Employee

* Create tasks/complaints
* View their own tasks
* Search and filter tasks
* View task details
* View comments and updates

### Staff

* View tasks assigned to them
* Update task status
* Add comments/updates
* View task details

### Admin

* View all tasks
* Assign tasks to staff
* Reassign tasks
* Update task status
* Add comments/updates
* Create Employee and Staff accounts
* View dashboard statistics

## Task Management

Each task contains:

* Title
* Description
* Category
* Priority
* Status
* Raised By
* Assigned Staff
* Comments/Updates

### Task Status

```text
Open
In Progress
Resolved
Closed
```

### Categories

```text
IT
Hardware
Software
Facilities
HR
Other
```

### Priority Levels

```text
Low
Medium
High
Urgent
```

## Dashboard

The dashboard displays:

* Total tasks
* Open tasks
* In Progress tasks
* Resolved tasks
* Closed tasks
* Tasks grouped by category

## Project Structure

```text
employee-task-complaint-tracker/
│
├── client/                 # Angular frontend
│   └── src/
│
├── server/                 # Node.js + Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/419Sumanth/Employee-task-complaint-tracker.git
```

```bash
cd Employee-task-complaint-tracker
```

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the Angular Frontend

Open another terminal:

```bash
cd client
npm install
ng serve
```

The frontend runs on:

```text
http://localhost:4200
```

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

## User Roles

| Role | Permissions |
| ---- | ----------- |
