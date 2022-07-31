import jwt from 'jsonwebtoken';
import IToken from '../interfaces/jwt.interface';
import User from '../interfaces/user.interface';

const secret = 'baianor';

export function sign(user: User[]): string {
  return jwt.sign({ 
    data: user[0] }, secret, { expiresIn: '1h', algorithm: 'HS256' });
}

export async function auth(token: string): Promise<number | undefined> {
  try {
    const { data: { id } } = jwt.verify(token, secret) as unknown as IToken;

    return id;
  } catch (err) {
    return undefined;
  }
}
