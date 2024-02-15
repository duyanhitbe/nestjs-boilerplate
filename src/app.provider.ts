import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
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
	}
];
