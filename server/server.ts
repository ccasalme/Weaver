import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';

if (!process.env.PORT) {
  console.error('PORT not set');
  process.exit(1);
}

await db();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

interface ErrorHandler extends Error {
  status?: number;
}

app.use((err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
