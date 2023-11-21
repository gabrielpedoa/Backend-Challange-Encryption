import { Request, Response } from "express";
import { createHash } from "../ultils/encrypter";
import prisma from "../ultils/prismaclient";
import { BodyValue } from "./post";

export default async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userDocument, creditCardToken, value } = req.body as BodyValue;

  if (!id) return res.status(400).json("O id é obrigatório");

  const findUser = await prisma.users.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!findUser) return res.status(400).json("Usuario não existe");

  const hashedUserDocument = await createHash(userDocument);
  const hashedCreditCardToken = await createHash(creditCardToken);
  const updateUser = await prisma.users.update({
    where: {
      id: Number(findUser.id),
    },
    data: {
      userDocument: hashedUserDocument,
      creditCardToken: hashedCreditCardToken,
      value,
    },
  });

  return res
    .status(200)
    .json({
      id: Number(updateUser.id),
      value: Number(updateUser.value),
      userDocument: userDocument,
      creditCardToken: creditCardToken,
    });
};
