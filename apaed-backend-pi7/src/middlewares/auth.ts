import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // @ts-ignore
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // @ts-ignore
    req.userId = decoded.id;
    // @ts-ignore
    req.localId = decoded.localId;
  } catch (e) {
    return res.status(401).json({ error: 'Token Invalid' });
  }

  return next();
};
