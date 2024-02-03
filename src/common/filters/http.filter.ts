import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
	constructor(private readonly i18n: I18nService) {}

	private logger = new Logger('HttpException');

	catch(exception: HttpException, _host: ArgumentsHost) {
		const exceptionResponse = exception.getResponse() as HttpExceptionResponse;
		const { error, statusCode, message } = exceptionResponse;

		this.logger.error(`[${statusCode}] - ${error}`);
		this.logger.error(`${JSON.stringify(message)}`);
	}
}
