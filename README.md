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
    - [📦 Dependencies Used](#-dependencies-used)
    - [Project Structure](#project-structure)
    - [📋 GraphQL API Queries and Mutations](#-graphql-api-queries-and-mutations)
  - [▶️ Usage](#️-usage)
    - [🚀 Click here to see deployed application on Render](#-click-here-to-see-deployed-application-on-render)
    - [📷 Screenshot of Homepage](#-screenshot-of-homepage)
    - [📷 Sreenshot of Profile Page](#-sreenshot-of-profile-page)
    - [🛠️ Technologies Used](#️-technologies-used)
  - [🤝 Contributing](#-contributing)
  - [🧪 Tests](#-tests)
  - [🪪 License](#-license)
  - [🧠 Architects](#-architects)

</details>

## 📝 Description

**Weaver** is an interactive social platform built for creatives and storytellers. Designed to spark collaboration, it allows users—called _Weavers_—to share short stories or prompts and co-create dynamic, evolving narratives. Think of it as a digital space where storytelling becomes a shared adventure.

Whether you're an aspiring writer seeking inspiration or a seasoned creative who thrives on collaboration, Weaver offers a vibrant hub for collective fiction. Users can craft story threads, explore alternate branches, vote on the canon storyline, and engage through comments and creative prompts.

Built as a single-page MERN stack application, **Weaver** combines modern web technologies with a passion for storytelling, making it the perfect playground for writers to imagine, connect, and create together.

## ✨ Features

- Story Threading, Branching, and Voting

- Comments and Discussions

- Writing Prompt Generator

- User Profiles with editable bios and avatars

- Liked Stories & Follower System

- GraphQL API with Apollo Server

- Component and End-to-End Testing with Cypress

- Render deployment with GitHub Actions CI/CD

- JWT Authentication

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

### 📦 Dependencies Used

**Client (Frontend) Dependencies**

| Package              | Description                                   |
| -------------------- | --------------------------------------------- |
| @apollo/client       | Apollo GraphQL client for React               |
| canvas-confetti      | Confetti animation for UI celebration effects |
| framer-motion        | Animation library for React                   |
| graphql              | GraphQL language and client integration       |
| react                | React core library for building UIs           |
| react-dom            | DOM rendering for React                       |
| react-markdown       | Render Markdown inside React components       |
| react-router-dom     | Declarative routing for React                 |
| vite                 | Fast dev/build tool for frontend              |
| @vitejs/plugin-react | Vite plugin to support React                  |
| typescript           | Static typing for JavaScript                  |
| cypress              | End-to-end testing tool                       |
| vitest               | Unit testing for Vite projects                |
| eslint               | JavaScript linter                             |
| eslint-plugin-\*     | ESLint plugins for React and best practices   |

**Server (Backend) Dependencies**

| Package        | Description                                     |
| -------------- | ----------------------------------------------- |
| express        | Fast, minimal web framework for Node.js         |
| @apollo/server | Apollo Server for GraphQL APIs                  |
| graphql        | GraphQL language support                        |
| mongoose       | MongoDB ODM for Node.js                         |
| jsonwebtoken   | Handling JWTs for authentication                |
| bcrypt         | Password hashing and authentication             |
| dotenv         | Loads env vars from .env                        |
| typescript     | Type safety in the backend                      |
| nodemon        | Hot-reloading for development                   |
| @types/\*      | Type definitions for Node.js and other packages |

**Root (Shared) Dependencies**

| Package      | Description                                       |
| ------------ | ------------------------------------------------- |
| express      | Shared server framework                           |
| graphql      | GraphQL base support                              |
| mongoose     | Database modeling used in both front and back     |
| jsonwebtoken | JWT utilities used in both server and client auth |
| bcrypt       | Shared authentication hashing                     |
| dotenv       | Shared configuration support                      |
| nodemon      | Development convenience tool                      |
| typescript   | Shared TypeScript configuration                   |
| @types/\*    | Project-wide type declarations                    |

### Project Structure

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
│   │   ├── models/        # Mongoose models
│   │   ├── schemas/       # typeDefs & resolvers
│   │   ├── utils/         # Authentication
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

[⬆ Back to top](#weaver)

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

- Express server runs on: `http://localhost:3000`

- GraphQL endpoint: `http://localhost:3001/graphql`

### 🚀 [Click here to see deployed application on Render](https://www.example.com)

### 📷 Screenshot of Homepage

### 📷 Sreenshot of Profile Page

### 🛠️ Technologies Used

**Frontend**
<br>&nbsp; <span>![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)</span>
<br>&nbsp; <span>![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router)</span>
<br>&nbsp; <span>![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)</span>
<br>&nbsp; <span>![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)</span>
<br>&nbsp; <span>![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)</span>
<br>&nbsp; <span>![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)</span>
<br>&nbsp; <span>![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)</span>
<br>&nbsp; <span>![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress)</span>

**Backend**
<br>&nbsp; <span>![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)</span>
<br>&nbsp; <span>![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)</span>
<br>&nbsp; <span>![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)</span>
<br>&nbsp; <span>![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose)</span>
<br>&nbsp; <span>![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)</span>
<br>&nbsp; <span>![Apollo](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql)</span>
<br>&nbsp; <span>![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens)</span>

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

Run Cypress tests using:

```
npm run cypress
```

GitHub Actions will run tests automatically on main before deploying to Render.

## 🪪 License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the [MIT License](LICENSE).

## 🧠 Architects

Feel free to reach out with suggestions or questions to the project architects!

👩‍💻 **Cyrl Casalme**

- Role: Client (Front-end)
- GitHub: [@ccasalme](https://github.com/ccasalme)
- Email: ccasalme@example.com

👩‍💻 **Stella Nabajja**

- Role: Database (Back-end)
- GitHub: [@snabaj](https://github.com/snabaj)
- Email: snabajja@gmail.com

👨‍💻 **Corey Parsons**

- Role: Cypress Testing & Github Actions CI/CD
- GitHub: [@cpars](https://github.com/cpars)
- Email: cpars@example.com

[⬆ Back to top](#weaver)
