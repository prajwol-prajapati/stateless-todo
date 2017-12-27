import * as jwt from '../utils/jwt';

function ensureToken(req, res, next) {
  jwt
    .verifyAccessToken(req.headers.authorization)
    .then(() => next())
    .catch(error => next(error));
}

export { ensureToken };
