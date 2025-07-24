# 🚀 Task-Flow – A Full Stack Task Management Web App

A sleek and modern task management application built with the **MERN** stack. It allows users to register, log in, and manage daily tasks with features like task filtering, animated UI, and responsive design.

---

## 🌍 Live Demo

🔗 **Frontend**: [https://task-flow-9po1.vercel.app](https://task-flow-9po1.vercel.app)

⚠️ **Note**: Backend is not deployed online due to hosting limitations, but can be run locally (see below).

---

## 📹 Demo Video

🎬 [Watch on YouTube (Unlisted)](https://youtu.be/dgoJqRYB1rk)]

---
## ✨ Features

- 🔐 User Registration & Login with JWT
- 📝 Add, Edit, Delete, Complete Tasks
- 🗂️ Task Filtering (All / Active / Completed)
- 🧼 Input validation & error handling
- 📱 Fully responsive (mobile-first design)
- 🧠 Clean UI with React Icons and smooth UX
- 🔐 Protected routes using tokens

---

## 🛠 Tech Stack

### 🔹 Frontend:
- React.js
- Axios
- React Icons
- CSS + Animations

### 🔸 Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt Password Hashing

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- Git
- visual studio codes 

---

### 📁 Clone the Repo

```bash
git clone https://github.com/HashinikaJanali/Task-Flow.git
cd Task-Flow
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://taskadmin:task1234@cluster0.wr28xcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mysecretjwtkey

```

Start the server:

```bash
npm start
```

Your backend will run on: `http://localhost:5000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 💡 Bonus Highlights

- 🎬 Splash screen animation with video background
- 📦 Axios interceptors to inject JWT token
- 🔁 Auto-refresh task list after every change
- 🧩 Modular file structure
- 📱 Mobile, tablet & desktop optimized

---

###🧪 Testing

The backend includes automated testing using Jest and Supertest.

🔹 What is Tested

✅ API Health check (/api/ping)

✅ You can extend tests to cover:

   1.User registration

   2.Login

   3.Task creation and updates

🧪 Run Tests

01.Go to the backend/ folder:
  cd backend
02.Run the test suite:
  npm test
  
You’ll see test results for API endpoints.

📂 Test File Example
tests/ping.test.js

const request = require('supertest');
const app = require('../app');

describe('GET /api/ping', () => {
  it('should return 200 and test message', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Server is working!');
  });
});

📌 More endpoint tests like POST /register, POST /login, etc., can be added for full coverage.

## 🧪 Test Credentials (optional)

```txt
Email: test@1234
Password: test1234
```

---

## 🧠 Assignment Notes

This project was developed for the **Full Stack Developer** technical assignment at **digitalmarketing.lk**, focusing on:

- ✅ Ability to follow instructions
- ✅ Full stack development proficiency
- ✅ Clean UI/UX & code organization

---

## 👩‍💻 Author

**Archana Janali Hashinka**  
📧 (hashinikaajanali@gmail.com)  
🔗 [LinkedIn](#) *(Hashinika Janali)*

---

## 📄 License

This project is licensed under the MIT License.
