import type { Request, Response } from 'express';

export function helloController(req: Request, res: Response) {
  res.send('Hello World!');
}