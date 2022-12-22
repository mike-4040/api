import type { Request, Response, NextFunction } from 'express';

export function logger(req: Request, _res: Response, next: NextFunction) {
  console.log('Request: ', req.method, req.path, "body: ", req.body)
  next();
}