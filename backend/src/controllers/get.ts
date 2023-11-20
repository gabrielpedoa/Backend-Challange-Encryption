import { Request, Response } from "express";
import prisma from "../ultils/prismaclient";

export default async (req: Request, res: Response) => {
  const getUser = await prisma.users.findMany({});

  return res.status(200).json(getUser);
};
