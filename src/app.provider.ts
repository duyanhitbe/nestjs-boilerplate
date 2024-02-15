import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { TypeOrmFilter } from './common/filters/typeorm.filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';

export const providers: Provider[] = [
	AppService,
	{
		provide: APP_PIPE,
		useClass: ValidationPipe
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: LoggerInterceptor
	},
	{
		provide: APP_FILTER,
		useClass: TypeOrmFilter
	}
];
