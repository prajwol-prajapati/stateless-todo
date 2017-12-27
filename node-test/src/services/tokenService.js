import * as jwt from '../utils/jwt';

export function fetchTokens(params) {
  return jwt.generateTokens(params);
}

export function fetchAccessToken(params) {
  return jwt.generateAccessToken(params);
}

export function verifyToken(token) {
  return jwt.verifyRefreshToken(token);
}
