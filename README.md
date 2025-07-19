# 🧪 Test Portal — Full-Stack Test Management System

A powerful, responsive full-stack test portal for managing tests, users, and real-time results — built with **MERN stack + Vite** and beautiful UI powered by **Tailwind CSS + Flowbite**.

---

## 📚 Table of Contents

- [🚀 Project Overview](#-project-overview)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Installation](#️installation)
- [📦 Running the Project](#running-the-project)
- [🗂️ Project Structure](#project-structure)
- [✨ Features](#features)
- [🤝 Contributing](#contributing)
- [🐞 Issues](#issues)
- [👤 Author](#author)
- [🪪 License](#license)

---

## 🚀 Project Overview

**Test Portal** is a robust and user-friendly web application for managing online assessments. It allows admins and teachers to create, assign, and monitor tests, while students can take tests in a secure environment with anti-cheat support and real-time result evaluation.

---

## 🛠️ Tech Stack

### 🔧 Backend

- **Node.js**, **Express.js**, **MongoDB** (Mongoose)
- **JWT** for authentication, **Bcryptjs** for hashing
- **Multer** for uploads, **Nodemailer** for emails
- Utility tools: `dotenv`, `cors`, `cookie-parser`, `otp-generator`, `express-async-handler`

### 💻 Frontend

- **React + Vite**, **Redux Toolkit**, **React Router**
- **Tailwind CSS**, **Flowbite UI**, **React Toastify**
- Charting with **ApexCharts**, icons via **React Icons**
- Extra: **Moment.js**, **Slick Carousel**

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/tushar-prajapati/Test-Portal.git
cd Test-Portal
```

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 📦 Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

### Run Both Concurrently (from root)

```bash
npm run dev
```

---

## 🗂️ Project Structure

```
/backend
  ├── controllers/       # API logic
  ├── middlewares/       # Auth, error handling
  ├── models/            # MongoDB schemas
  ├── routes/            # Express routes
  ├── utils/             # Helpers
  └── index.js           # Entry point

/frontend
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   └── main.jsx
  └── vite.config.js
```

---

## ✨ Features

- 🔐 **Role-Based Authentication** (Admin, Teacher, Student)
- 🛠 **Test & Question Creation**, Editing, and Deletion
- 📊 **Real-Time Result Analytics** with ApexCharts
- 📁 File uploads using **Multer**
- ✉️ Password reset via **OTP & Nodemailer**
- 🔒 Protected routes and **JWT-based security**
- 📱 Mobile-friendly & modern UI
- 🚨 **Anti-cheating** features for tests
- 🔄 Fully reactive interface with **Redux Toolkit**
- 📈 Interactive charts and activity insights

---

## 🤝 Contributing

Contributions are welcome! Fork and submit a pull request with your improvements.

---

## 🐞 Issues

Have bugs or feature suggestions? Open an issue [here](https://github.com/tushar-prajapati/Test-Portal/issues).

---

## 👤 Author

**Tushar Prajapati**  
[GitHub](https://github.com/tushar-prajapati)

---

## 🪪 License

Licensed under the **ISC License**.
