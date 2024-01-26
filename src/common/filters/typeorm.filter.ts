import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
	private logger = new Logger('TypeORMError');

	catch(exception: TypeORMError, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		let message: string = (exception as TypeORMError).message;
		const code: string = (exception as any).code;
		if (code === '23505') {
			message = 'Dữ liệu bị trùng lặp';
		}
		const customResponse = {
			status: 500,
			message: 'Internal Server Error',
			errors: [{ code: code, message: message }]
		};
		this.logger.error(JSON.stringify(exception));
		response.status(customResponse.status).json(customResponse);
	}
}
