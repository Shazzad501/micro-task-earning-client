# Micro Tasking and Earning Platform

## 📌 Introduction

The **Micro Tasking and Earning Platform** is designed to provide users with opportunities to complete small tasks and earn money. The platform accommodates three distinct roles:

- **Worker**: Users who complete tasks and earn money.
- **Buyer**: Users who create and post tasks for workers to complete.
- **Admin**: Manages platform operations, users, and tasks.

The platform ensures seamless task management, task creation, and administration while maintaining a smooth user experience.

---

## 📖 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development](#development)
- [License](#license)

---

## ✨ Features

- 🛠 **Task Management**: Workers can browse and complete available tasks.
- 💰 **Earnings System**: Users earn money for completing tasks.
- 📜 **Task Creation**: Buyers can post and manage tasks.
- 🔑 **Authentication**: Secure user authentication using Firebase.
- 📊 **Admin Dashboard**: Admins can manage users, tasks, and earnings.
- 💳 **Payment Integration**: Stripe integration for secure transactions.
- 📸 **Image Upload**: Image hosting support for task-related media.

---

## ⚙️ Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v16+)
- [Vite](https://vitejs.dev/)
- [Firebase Account](https://firebase.google.com/)
- [Stripe Account](https://stripe.com/)

### Steps

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/your-username/micro-tasking-platform.git
   cd micro-tasking-platform
   ```

2. **Install Dependencies**  
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and configure it as follows:

   ```env
   VITE_Payment_Publish_Key=your-stripe-publishable-key
   VITE_apiKey=your-firebase-api-key
   VITE_authDomain=your-firebase-auth-domain
   VITE_projectId=your-firebase-project-id
   VITE_storageBucket=your-firebase-storage-bucket
   VITE_messagingSenderId=your-firebase-messaging-sender-id
   VITE_appId=your-firebase-app-id
   VITE_IMAGE_HOSTING_KEY=your-image-hosting-key
   ```

   **⚠️ Do not share this file publicly!**

4. **Run the Development Server**  
   ```sh
   npm run dev
   ```

5. **Build for Production**  
   ```sh
   npm run build
   ```

---

## 🚀 Usage

- **Workers**: Sign up, browse available tasks, complete them, and earn money.
- **Buyers**: Post tasks with details, deadlines, and rewards.
- **Admins**: Manage user roles, monitor transactions, and oversee platform activities.

---

## 🔧 Configuration

The platform uses Firebase for authentication and Stripe for payments. To configure the project, set up Firebase and Stripe accounts, and provide the required API keys in the `.env` file.

---

## 📦 Dependencies

The project uses the following dependencies:

### **Main Dependencies**
- React (`18.3.1`)
- React Router DOM (`7.1.1`)
- Axios (`1.7.9`)
- Firebase (`11.1.0`)
- Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- Material UI (`@mui/material`)
- Tailwind CSS (`windicss`, `daisyui`)
- Swiper (`11.2.1`)
- React Hook Form (`7.54.2`)

### **Development Dependencies**
- Vite (`6.0.5`)
- ESLint (`9.17.0`)
- PostCSS (`8.5.1`)

To install all dependencies, run:

```sh
npm install
```

---

## 🎨 Development

### **Linting & Formatting**
Run ESLint to check for code quality issues:

```sh
npm run lint
```

### **Run Development Server**
```sh
npm run dev
```

### **Build for Production**
```sh
npm run build
```

---

## 👨‍💻 Contributors

- Shazzad Maruf(https://github.com/Shazzad501) – Creator & Maintainer

---
