import { NextFunction, Request, Response } from 'express';
import { ROLES, VALID_PERMISSIONS, PERMISSIONS_BY_ROLE } from '../constants';
import { dbClient } from '../datastore/dbClient';
import { AuthedRequest } from '../types';
import { UserError } from '../utilMiddleware/errorHandler';

// this is a factory function that returns a middleware
// path an array of required permissions for the route
export const makeGuard = (requiredPermissions: typeof VALID_PERMISSIONS) => {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    const { user } = req;
    // should never happen, but just in case
    if (!user) {
      throw new UserError('Unauthorized', 401);
    }

    const { role = ROLES.guest } = user;

    const userPermissions = PERMISSIONS_BY_ROLE[role];

    if (
      !requiredPermissions.some(permission =>
        userPermissions.includes(permission as any)
      )
    ) {
      throw new UserError('Forbidden', 403);
    }

    next();
  };
};
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
    throw new UserError('Unauthorized', 401);
  }

  const user = dbClient.getUserById(userId);
  if (!user) {
    throw new UserError('Unauthorized', 401);
  }

  Object.assign(req, { user });
  next();
};
