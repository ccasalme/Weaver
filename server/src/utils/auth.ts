import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'url';

// Always resolve to the *real* server directory (not dist/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, '../../.env'); // go 2 levels up

dotenv.config({ path: rootEnvPath });
console.log("✅ JWT_SECRET_KEY loaded:", process.env.JWT_SECRET_KEY);


dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});


console.log("JWT_SECRET_KEY loaded:", process.env.JWT_SECRET_KEY);
console.log("✅ MONGODB_URI:", process.env.MONGODB_URI);

import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';



export const authenticateToken = ({ req }: any) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    return req;
  }

  // Try to verify the token
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    // If the token is valid, attach the user data to the request object
    req.user = data;
  } catch (err) {
    // If the token is invalid, log an error message
    console.log('Invalid token');
  }

  // Return the request object
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined. Please check your .env setup.");
  }

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};


export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

