import { NextFunction, Request, Response } from 'express';
import { dbClient } from '../datastore/dbClient';
import { UserError } from '../utilMiddleware/errorHandler';

// rudimentary auth middleware: userId is passed in Authorization header
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    throw new UserError('Missing Authorization header', 401);
  }

  const [_, userId] = authorization.split(' ');
  if (!userId) {
    throw new UserError('Malformed token', 401);
  }

  const user = dbClient.getUserById(userId);
  if (!user) {
    throw new UserError('User not found, please try to login', 401);
  }

  Object.assign(req, { user });
  next();
};
