import { Request, Response } from "express";
import existsInBody from "../ultils/existsInBody";
import prisma from "../ultils/prismaclient";
import { compareHashedValue, createHash } from "../ultils/encrypter";

interface BodyValue {
  userDocument: string;
  creditCardToken: string;
  value: number;
}

export default async (req: Request, res: Response) => {
  try {
    const { userDocument, creditCardToken, value }: BodyValue = req.body;

    existsInBody(userDocument, "userDocument");
    existsInBody(creditCardToken, "creditCardToken");
    existsInBody(value, "value");

    const verifyAlreadyUsed = await prisma.users.findFirst({
      where: {
        userDocument,
      },
    });

    if (verifyAlreadyUsed) {
      return res.status(400).json("esse documento ja está sendo utilizado");
    } else {
      const hashedUserDocument = await createHash(userDocument);
      const hashedCreditCardToken = await createHash(creditCardToken);

      const insertUserInfo = await prisma.users.create({
        data: {
          creditCardToken: hashedCreditCardToken,
          userDocument: hashedUserDocument,
          value: Number(value),
        },
      });

      return res.status(200).json(insertUserInfo);
    }
  } catch (error) {
    const { message }: any = error;
    return res.status(400).json(message);
  }
};
