import { Request, Response } from 'express';

export const example = (req: Request, res: Response) => {
  res.json({ message: 'Controller funcionando!' });
};
