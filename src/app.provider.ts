import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { HttpFilter } from './common/filters/http.filter';
import { TypeOrmFilter } from './common/filters/typeorm.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

export const providers: Provider[] = [
	AppService,
	{
		provide: APP_PIPE,
		useClass: ValidationPipe
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: ClassSerializerInterceptor
	},
	{
		provide: APP_FILTER,
		useClass: TypeOrmFilter
	},
	{
		provide: APP_FILTER,
		useClass: HttpFilter
	}
];
