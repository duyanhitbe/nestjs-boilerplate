import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string(),
				PORT: Joi.number(),

				DB_HOST: Joi.string(),
				DB_PORT: Joi.number(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required().allow(''),
				DB_NAME: Joi.string().required(),
				DB_SCHEMA: Joi.string().required(),

				SECRET_JWT: Joi.string().required(),

				REDIS_HOST: Joi.string().default('localhost'),
				REDIS_PORT: Joi.number().default(6379),
				REDIS_DB: Joi.number().default(1),
				REDIS_PASSWORD: Joi.string().required(),
				REDIS_PREFIX: Joi.string().required(),

				MAIL_HOST: Joi.string().required(),
				MAIL_FROM: Joi.string().required(),
				MAIL_USER: Joi.string().required(),
				MAIL_PASS: Joi.string().required()
			})
		})
	]
})
export class ConfigModule {}
