import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(
    req: Request,
    res: Response & { handleError?: (error: Error) => void },
    next: NextFunction,
  ) {
    res.handleError = (error: Error) => {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
        error instanceof HttpException
          ? error.getResponse()
          : 'Something went wrong';

      res.status(status).json({
        statusCode: status,
        message: message,
      });
    };
    next();
  }
}
