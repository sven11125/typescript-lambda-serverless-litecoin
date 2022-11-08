import * as jwt from 'jsonwebtoken';

import { Users } from '@/db/entities/Users';
import { UserService } from '@dbTransactions/user-service';

import { privateKey } from './private.key'
import { publicKey } from './public.pem'

export const getAuthenticatedUser = async (headers: any): Promise<Users> => {
  if (!headers || !headers.Authorization) {
    throw new Error(`Authorization header does not exist`);
  }
  const token = headers.Authorization.replace('Bearer ', '');
  let decodedToken;
  let verifyResult = jwt.verify(token, privateKey);
  try {
    decodedToken = jwt.decode(token, { complete: true });
  } catch (err) {
    throw err;
  }
  if (!decodedToken || !decodedToken.payload) {
    throw new Error(`Invalid Authorization token`);
  }
  let verifiedToken: Users;

  const userId: string = decodedToken.payload.userId;

  verifiedToken = await UserService.getUserById(+userId);

  return verifiedToken;
};

export const signToken = async (userId: number): Promise<string> => {
  let user: Users;
  user = await UserService.getUserById(userId);
  const token = jwt.sign({ userId, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, privateKey);
  return token;
}

export const tryCheckUserRole = (user: Users, userRole: string) => {
  return
};