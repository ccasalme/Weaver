# 🕸️ Weaver

## 📌 Project Overview
Weaver is a **full-stack TypeScript** project using **React, Express, Apollo GraphQL, Mongoose, Cypress, and Vitest**. The project is structured with separate **client** and **server** folders.

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ccasalme/Weaver.git
cd Weaver
```
🔄 **Make sure you're in the `Weaver` directory before continuing!**

---

### **2️⃣ Install Dependencies**
**Run this command to install EVERYTHING at once:**
```bash
npm run install:dependencies
```
👉 This will install both **client** (React) and **server** (Node.js) dependencies.

**👉 Want to install separately?**
```bash
npm run install:client  # Frontend dependencies
npm run install:server  # Backend dependencies
```

---

### **3️⃣ Setup Environment Variables (`.env` file)**
🔴 **THIS STEP IS CRITICAL!** Without this, the server **WILL NOT RUN** ❌  

Inside the **`server/`** directory, **create a `.env` file** and add:
```
PORT=3001
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
JWT_EXPIRATION=7d
```
🔹 Replace `yourUsername`, `yourPassword`, and `yourCluster` with **your actual MongoDB credentials**.  
🔹 **DO NOT** push this `.env` file to GitHub!

❌ **DO NOT INSTALL `cors`**
Since the **client and server are within the same project**, there is **NO NEED** for CORS. If you install it, it may cause unnecessary issues.

---

### **4️⃣ Build the Project**
```bash
npm run build
```
🔹 This compiles TypeScript and prepares both frontend & backend.

---

### **5️⃣ Start Development Mode**
To **start both frontend and backend** in dev mode:  
```bash
npm run dev
```
🔹 **Frontend (React)** will run at: `http://localhost:3000`  
🔹 **Backend (GraphQL API)** will run at: `http://localhost:3001`

**👉 Need to run them separately?**
```bash
npm run client:dev  # Starts frontend only
npm run server:dev  # Starts backend only
```

---

### **6️⃣ Running Tests**
**🔹 Unit & Component Tests (Vitest & Cypress Component)**
```bash
npm run test:client
```
**🔹 Backend Tests (Vitest for API & Unit Tests)**
```bash
npm run test:server
```
**🔹 End-to-End Testing (Cypress E2E)**
```bash
npm run test:e2e
```

---

### **7️⃣ Seeding the Database**
If your app requires seed data, run:
```bash
npm run seed
```
🔹 This will populate the database with initial data.

---

## 🌐 Running Only the Server (For Backend Devs) 
If you're **only working on the server**, follow these steps:

### **1️⃣ Navigate to the Server**
```bash
cd Weaver/server
```

### **2️⃣ Install Server Dependencies**
```bash
npm install
```

### **3️⃣ Setup `.env` File** (See step 3 above for details)

### **4️⃣ Build the Server**
```bash
npm run build
```

### **5️⃣ Start the Server**
To start in development mode (auto-restarts on file changes):
```bash
npm run dev
```
✅ The server will run at **`http://localhost:3001`**

**Want to run production build instead?**
```bash
npm start
```

### **6️⃣ Running Backend Tests**
```bash
npm run test
```

### **7️⃣ Seeding the Database**
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

## 👥 Contributing Guidelines
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
✅ **DO NOT push `.env` files!**  
✅ **Run `npm run test` before submitting code!**  

---

## 📢 Notes for the Team
🚨 **DO NOT SKIP `.env` SETUP!**  
✅ **Test API endpoints using Postman or Insomnia.**  
✅ **Write tests before pushing code!**  
✅ **Run `npm run lint` before submitting a PR.**  

🚀 **Happy coding, team!** 💖✨



