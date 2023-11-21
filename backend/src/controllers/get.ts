import { Request, Response } from "express";
import prisma from "../ultils/prismaclient";
import { decryptHash } from "../ultils/encrypter";

export default async (req: Request, res: Response) => {
  const getUser = await prisma.users.findMany({});
  const mappedUsers = await Promise.all(
    getUser.map(async (item) => ({
      id: Number(item.id),
      userDocument: await decryptHash(item.userDocument),
      creditCardToken: await decryptHash(item.creditCardToken),
      value: Number(item.value),
    })) 
  );
  return res.status(200).json(mappedUsers);
};
