import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
	private logger = new Logger('HttpException');

	catch(exception: HttpException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		const statusCode = exception.getStatus();
		const exceptionResponse = exception.getResponse() as HttpExceptionResponse;
		const { error, message } = exceptionResponse;

		this.logger.error(`[${statusCode}] - ${error}`);
		this.logger.error(`${JSON.stringify(message)}`);

		response.status(statusCode).json(exceptionResponse);
	}
}
