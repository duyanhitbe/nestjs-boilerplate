import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppService } from './app.service';
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
		useClass: FormatResponseInterceptor
	},
	{
		provide: APP_FILTER,
		useFactory() {
			return new I18nValidationExceptionFilter();
		}
	}
];
