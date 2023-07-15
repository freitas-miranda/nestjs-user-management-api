import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let erro: any;

    if (exception.response) {
      if (exception.response.message) {
        erro = exception.response.message;
      } else if (exception.response.data && exception.response.data.erro) {
        erro = exception.response.data.erro;
      } else {
        erro = 'Erro interno do servidor!';
      }
    } else if (exception.message) {
      erro = exception.message;
    } else {
      erro = exception;
    }

    response.status(status).json({ erro });
  }
}
