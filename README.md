# Weaver

## 📌 Project Overview
Weaver is a **full-stack TypeScript** project using **React, Express, Apollo GraphQL, Mongoose, Cypress, and Vitest**. The project is structured with separate **client** and **server** folders.

---

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ccasalme/Weaver.git
cd Weaver
```

### **2️⃣ Install Dependencies**
To install all dependencies for both the client and server, run:
```bash
npm run install:dependencies
```
This will automatically install dependencies for both the client and server.

Alternatively, install dependencies separately:
```bash
npm run install:client  # Install frontend dependencies
npm run install:server  # Install backend dependencies
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file inside the `server` directory and add the following:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRATION=7d
```

### **4️⃣ Build the Project**
```bash
npm run build
```
This will build both the client and server.

### **5️⃣ Start Development Mode**
Run the development servers for both frontend and backend:
```bash
npm run dev
```
The **frontend** will be available at **http://localhost:3000**
The **backend API** will run at **http://localhost:3001**

Alternatively, you can run them separately:
```bash
npm run client:dev  # Starts frontend only
npm run server:dev  # Starts backend only
```

### **6️⃣ Running Tests**
#### **🔹 Unit & Component Tests (Vitest & Cypress Component)**
```bash
npm run test:client
```
#### **🔹 Backend Tests (Vitest for API & Unit Tests)**
```bash
npm run test:server
```
#### **🔹 End-to-End Testing (Cypress E2E)**
```bash
npm run test:e2e
```

### **7️⃣ Seeding the Database**
If you have seed data set up, run:
```bash
npm run seed
```

---

## 📂 Project Structure
```
Weaver/
│── client/                # Frontend (React + Vite)
│   ├── src/               # React components, hooks, etc.
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── tsconfig.json      # TypeScript config
│   ├── vite.config.ts     # Vite config
│
│── server/                # Backend (Node.js, Express, GraphQL, Mongoose)
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth, validation, etc.
│   │   ├── models/        # Mongoose models
│   │   ├── utils/         # Utility functions
│   │   ├── server.ts      # Main server file
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # TypeScript config
│   ├── nodemon.json       # Nodemon config for development
│
│── cypress/               # Cypress E2E and component tests
│
│── package.json           # Root scripts & dependencies
│── tsconfig.json          # TypeScript project references
│── README.md              # Project documentation
```

---

## 🛠️ Technologies Used
- **Frontend:** React, Vite, TypeScript, ESLint
- **Backend:** Node.js, Express, Apollo GraphQL, Mongoose, JWT authentication
- **Testing:** Cypress (E2E & Component), Vitest (Unit & Integration)
- **Tooling:** Nodemon, ESLint, Prettier, Concurrently

---

## 👥 Contributing
1. **Clone the repo** and create a new branch:
   ```bash
   git checkout -b feature-name
   ```
2. **Make your changes** and commit:
   ```bash
   git commit -m "Added new feature"
   ```
3. **Push to GitHub** and open a Pull Request:
   ```bash
   git push origin feature-name
   ```

---

## 📢 Notes for the Team
✅ **Keep your `.env` file safe!** Never push it to GitHub. Use `.gitignore` to prevent it from being committed.
✅ **Use TypeScript everywhere!** Avoid `any` type unless absolutely necessary.
✅ **Write tests!** Cypress for E2E and component tests, Vitest for unit tests.
✅ **Run `npm run lint` before pushing code.**
✅ **Ask for help if needed!**

🚀 Happy coding, team! 💖✨

