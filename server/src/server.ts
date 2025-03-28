import express, { Application } from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import db from './config/connection.js';
//import authRoutes from './routes/auth.js'; // ✅ Ensure this is importing the Router

dotenv.config();

await db();

const app: Application = express(); // ✅ Ensure this is an Express app

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Register Routes Properly
// app.use('/api/auth', authRoutes); // ✅ This must be a Router, not a function!

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
