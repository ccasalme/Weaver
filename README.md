# 🕸️ Weaver

![weaverBanner](https://github.com/user-attachments/assets/0221f1c8-1428-4328-bfa3-c8a1a88cbe0d)

## Table of Contents

<details>
  <summary>Click to expand</summary>

- [🕸️ Weaver](#️-weaver)
  - [Table of Contents](#table-of-contents)
  - [📝 Description](#-description)
  - [✨ Features](#-features)
  - [⚙️ Installation](#️-installation)
    - [📦 Dependencies Used and their Versions](#-dependencies-used-and-their-versions)
    - [✅ Project Structure](#-project-structure)
    - [📋 GraphQL API Queries and Mutations](#-graphql-api-queries-and-mutations)
  - [▶️ Usage](#️-usage)
    - [📷 Screenshot of Homepage](#-screenshot-of-homepage)
    - [🚀 Click here to checkout the deployed application on Render](#-click-here-to-checkout-the-deployed-application-on-render)
    - [🛠️ Technologies Used](#️-technologies-used)
  - [🤝 Contributing](#-contributing)
  - [🧪 Tests](#-tests)
  - [🪪 License](#-license)
  - [👤👤 Architects](#-architects)

</details>

## 📝 Description

**Weaver** is an interactive social platform built for creatives and storytellers. Designed to spark collaboration, it allows users—called _Weavers_—to share short stories or prompts and co-create dynamic, evolving narratives. Think of it as a digital space where storytelling becomes a shared adventure.

Whether you're an aspiring writer seeking inspiration or a seasoned creative who thrives on collaboration, Weaver offers a vibrant hub for collective fiction. Users can craft story threads, explore alternate branches, vote on the canon storyline, and engage through comments and creative prompts.

Built as a single-page MERN stack application, **Weaver** combines modern web technologies with a passion for storytelling, making it the perfect playground for writers to imagine, connect, and create together.

## ✨ Features

- Collaborative Story Threads

- Branching Narrative System

- Voting for Canon Paths

- Commenting on Stories and Threads

- Writing Prompt Generator

- Personalized User Profiles

- Follower and Like System

- Secure JWT-Based Authentication

- GraphQL API Powered by Apollo Server

- Cypress Testing Integration

- Modern Tech Stack (MERN + Vite + TypeScript)

- CI/CD with GitHub Actions + Render Deployment

## ⚙️ Installation

**Clone the Repository**

```
git clone https://github.com/ccasalme/weaver.git
cd weaver
```

**Install Dependencies**

```
npm install
```

**🔐 .env File**

Create a .env file in the root directory with the following:

```
JWT_SECRET_KEY=your_jwt_secret
MONGODB_URI=your_mongo_connection_uri
```

### 📦 Dependencies Used and their Versions
```
{
  # Client-side runtime dependencies for the React frontend
  "client": {
    "dependencies": {
      "@apollo/client": "^3.13.4",        # Apollo GraphQL client for React
      "canvas-confetti": "^1.9.3",        # Confetti animation for celebration effects
      "framer-motion": "^12.6.3",         # Framer Motion animation library for React
      "graphql": "^16.10.0",              # GraphQL language and client integration
      "react": "18.2.0",                  # Core React library for building UIs
      "react-dom": "18.2.0",              # React DOM renderer
      "react-markdown": "^10.1.0",        # Render Markdown inside React
      "react-router-dom": "^6.30.0"       # Declarative routing for React apps
    }
  },

  # Server-side runtime dependencies for handling API and GraphQL requests
  "server": {
    "dependencies": {
      "bcrypt": "^4.0.1",                 # Password hashing and authentication
      "express": "^4.19.2",               # Web framework for Node.js
      "@apollo/server": "^4.10.4",        # Apollo GraphQL server
      "graphql": "^16.9.0",               # GraphQL support for APIs
      "jsonwebtoken": "^8.5.1",           # Handling JWTs for user authentication
      "mongoose": "^8.0.0"                # MongoDB object modeling for Node.js
    }
  },

  # Packages shared across the full-stack app
  "main": {
    "dependencies": {
      "bcrypt": "^4.0.1",                 # Shared authentication hashing
      "express": "^4.19.2",               # Shared server framework
      "@apollo/server": "^4.10.4",        # Apollo server used across stack
      "graphql": "^16.9.0",               # Shared GraphQL base
      "jsonwebtoken": "^8.5.1",           # Shared JWT support
      "mongoose": "^8.0.0"                # Shared MongoDB object modeling
    }
  }
}

```

### ✅ Project Structure

```
Weaver/
│── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── Components/    # Reusable React UI components
│   │   ├── GraphQL/       # Front-end mutations and queries
│   │   ├── Pages/         # Page-level React components/routes
│   │   ├── Types/         # TypeScript type definitions
│   │   ├── Utils/         # Front-end authentication
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── tsconfig.json      # TypeScript config
│   ├── vite.config.ts     # Vite config
│
│── server/                # Backend (Node.js, Express, GraphQL, Mongoose)
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── models/        # Mongoose models
│   │   ├── schemas/       # TypeDefs & resolvers
│   │   ├── utils/         # Authentication
│   │   ├── seeds/         # Seed data for database
│   │   ├── server.ts      # Main server file
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # TypeScript config
│   ├── nodemon.json       # Nodemon config for development
│
│── cypress/               # Cypress E2E and component tests
│
│── package.json           # Root scripts & dependencies
│── tsconfig.json          # TypeScript project references
│── cypress.config.ts      # Configures how Cypress runs tests
│── README.md              # Project documentation
```

[⬆ Back to top](#table-of-contents)


### 📋 GraphQL API Queries and Mutations

| Query        | Description                                              |
| ------------ | -------------------------------------------------------- |
| `me`         | Retrieves the currently authenticated user's information |
| `myProfile`  | Fetches the profile linked to the logged-in user         |
| `getStories` | Fetches all story threads shared by users                |
| `getPrompts` | Returns a list of creative writing prompts               |

| Mutation        | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `addUser`       | Registers a new user and creates a corresponding profile      |
| `login`         | Authenticates a user and returns a JWT token                  |
| `createStory`   | Creates a new story thread and links it to the user's profile |
| `branchStory`   | Creates a new story that branches from an existing one        |
| `deleteStory`   | Deletes a story and associated comments                       |
| `likeStory`     | Likes a story and adds it to the user's liked list            |
| `voteStory`     | Records or updates a user's vote on a story                   |
| `addComment`    | Adds a comment to a specific story                            |
| `deleteComment` | Deletes a user's own comment from a story                     |
| `followUser`    | Adds the current user to another profile's followers list     |
| `unfollowUser`  | Removes the current user from a profile's followers list      |

---

## ▶️ Usage

**Build the application:**

```
npm run build
```

**Seed the database:**

```
npm run seed
```

**Start the development server:**

```
npm run develop
```

**🧩 Server Info**

  Express server runs on: 
  ```
  http://localhost:3000
  ```

  GraphQL endpoint: 
  ```
  http://localhost:3001/graphql
  ```

### 📷 Screenshot of Homepage
![weaver-homepage](client/src/assets/weaver-homepage.jpg)

### 🚀 [Click here to checkout the deployed application on Render](https://weaver-9su3.onrender.com/)

### 🛠️ Technologies Used

**Frontend**
<br>&nbsp; <span>[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)](https://reactjs.org)</span>
<br>&nbsp; <span>[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router)](https://reactrouter.com)</span>
<br>&nbsp; <span>[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)</span>
<br>&nbsp; <span>[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)</span>
<br>&nbsp; <span>[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)</span>
<br>&nbsp; <span>[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)</span>
<br>&nbsp; <span>[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)</span>
<br>&nbsp; <span>[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress)](https://www.cypress.io)</span>

**Backend**
<br>&nbsp; <span>[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)</span>
<br>&nbsp; <span>[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com)</span>
<br>&nbsp; <span>[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)</span>
<br>&nbsp; <span>[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose)](https://mongoosejs.com)</span>
<br>&nbsp; <span>[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)](https://graphql.org)</span>
<br>&nbsp; <span>[![Apollo](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql)](https://www.apollographql.com/docs/apollo-server)</span>
<br>&nbsp; <span>[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io)</span>

## 🤝 Contributing

We welcome contributions from the community! To get started:

**🔄 Fork & Clone**

1. Fork the repository on GitHub.

2. Clone your forked repository:

```
git clone https://github.com/username/weaver.git
cd weaver
```

3. Create a new branch:

```
git checkout -b your-feature-branch
```

4. Make your changes and commit:

```
git commit -m "Add your message here"
```

5. Push to your fork:

```
git push origin your-feature-branch
```

6. Open a pull request from your branch to the main branch on the original repository.

   Please make sure your code follows the existing style and passes all tests.

## 🧪 Tests

For running tests in the terminal, use:
```
npm run test
```

For Cypress GUI, run tests using:

```
npm run cypress
```

GitHub Actions will run tests automatically on main before deploying to Render.

## 🪪 License

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

This project is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## 👤👤 Architects

Feel free to reach out with suggestions or questions to the project architects!

<a href="https://github.com/ccasalme">
  <img src="https://github.com/ccasalme.png" width="100" style="border-radius: 50%;" alt="Cyrl Casalme" />
</a> 

**Cyrl Casalme**

- **Role**: Front-end
- **GitHub**: [@ccasalme](https://github.com/ccasalme)
- **Email**: cyrl.casalme@gmail.com

<a href="https://github.com/snabaj">
  <img src="https://github.com/snabaj.png" width="100" style="border-radius: 50%;" alt="Stella Nabajja" />
</a> 

**Stella Nabajja**

- **Role**: Database
- **GitHub**: [@snabaj](https://github.com/snabaj)
- **Email**: snabajja@gmail.com

<a href="https://github.com/cpars">
  <img src="https://github.com/cpars.png" width="100" style="border-radius: 50%;" alt="Corey Parsons" />
</a> 

**Corey Parsons**

- **Role**: Cypress Testing & Github Actions CI/CD
- **GitHub**: [@cpars](https://github.com/cpars)
- **Email**: cparsons0730@yahoo.com


[⬆ Back to top](#table-of-contents)
