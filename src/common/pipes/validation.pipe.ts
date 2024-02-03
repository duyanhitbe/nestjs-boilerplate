import {
	BadRequestException,
	Inject,
	Injectable,
	ValidationPipe as NestValidationPipe,
	Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable({ scope: Scope.REQUEST })
export class ValidationPipe extends NestValidationPipe {
	constructor(
		@Inject(REQUEST) private readonly req: Request,
		private readonly i18nService: I18nService
	) {
		super({
			transform: true,
			whitelist: true,
			exceptionFactory(errors) {
				const lang = req['i18nLang'];
				const messages: string[] = errors.map((error) => {
					const message = error.constraints?.[Object.keys(error.constraints)[0]] || '';
					return i18nService.t(message, {
						args: error,
						lang
					});
				});

				return new BadRequestException({
					message: messages,
					error: 'Bad Request',
					statusCode: 400
				});
			}
		});
	}
}
