import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;
const salt = process.env.NEXTAUTH_SALT;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req: req as any, secret: secret as string, salt: salt as string
   });
  console.log("JSON Web Token", token);
  res.status(200).json({ token });
}