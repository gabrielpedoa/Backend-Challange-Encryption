import { Request, Response } from "express";
import { createHash } from "../ultils/encrypter";
import existsInBody from "../ultils/existsInBody";
import prisma from "../ultils/prismaclient";

export interface BodyValue {
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
  } catch (error) {
    const { message }: any = error;
    return res.status(400).json(message);
  }
};
