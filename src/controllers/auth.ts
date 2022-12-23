import type { NextFunction, Request, Response } from 'express';

import { dbClient } from '../datastore/dbClient';
import type { SomeRequired, User } from '../types';
import { UserError } from '../utilMiddleware/errorHandler';

export function login(req: Request, res: Response) {
  const { id } = req.body;

  const user = dbClient.getUserById(id);
  if (!user) {
    throw new UserError('User not found', 404);
  }

  res.json({ user });
}


export function signUp(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) {
    // this will work only in sync functions, for async functions we need to call next()
    throw new UserError('Name is required');
  }

  const createUser: SomeRequired<User, 'name'> = {
    name,
  };

  const user = dbClient.creteUser(createUser);

  res.json({ user });
}
