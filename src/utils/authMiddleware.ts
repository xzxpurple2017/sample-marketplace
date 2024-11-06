import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

const jwksClient = jwksRsa({
  jwksUri: 'https://cognito-idp.<region>.amazonaws.com/<user-pool-id>/.well-known/jwks.json',
});

function getKey(header: any, callback: any) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    console.log(req) ;

    req.user = decoded;
    next();
  });
};