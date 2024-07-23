// Jwt and User Type so my Request type doesnt throw a Type error

import { User } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
    user: User;
  }
}
