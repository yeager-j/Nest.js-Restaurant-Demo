import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://apago.auth0.com/.well-known/jwks.json',
        }),

        audience: 'http://localhost:3000',
        issuer: 'https://apago.auth0.com/',
        algorithm: 'RS256',
      })(req, res, (err) => {
        if (err) {
          const status = err.status || 500;
          const message = err.message || 'Sorry, Jackson messed up somewhere. I bet if you give him a raise he would write better code ;)';

          return res.status(status).send({ message });
        }

        next();
      });
    };
  }
}
