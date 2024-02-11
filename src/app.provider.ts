import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppService } from './app.service';
import { TypeOrmFilter } from './common/filters/typeorm.filter';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';

export const providers: Provider[] = [
	AppService,
	{
		provide: APP_PIPE,
		useFactory() {
			return new I18nValidationPipe({ transform: true, whitelist: true });
		}
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: ClassSerializerInterceptor
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: FormatResponseInterceptor
	},
	{
		provide: APP_FILTER,
		useClass: TypeOrmFilter
	},
	{
		provide: APP_FILTER,
		useFactory() {
			return new I18nValidationExceptionFilter({
				errorFormatter(errors) {
					return errors.map(({ property, constraints }) => {
						const key = Object.keys(constraints || {})[0];
						const error = constraints?.[key] || 'Invalid';
						return {
							property,
							error
						};
					});
				},
				responseBodyFormatter(host, exc, formattedErrors) {
					const response = exc.getResponse();
					const status = exc.getStatus();
					return {
						status,
						message: response,
						errors: formattedErrors
					};
				}
			});
		}
	}
];
