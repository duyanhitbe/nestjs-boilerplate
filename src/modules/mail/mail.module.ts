import { MetadataKey } from '@common';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { IMailService } from './mail.interface';
import { MailService } from './mail.service';

@Global()
@Module({
	providers: [
		{
			provide: IMailService,
			useClass: MailService
		},
		{
			provide: MetadataKey.NODEMAILER,
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return createTransport({
					host: configService.get<string>('MAIL_HOST'),
					from: configService.get<string>('MAIL_FROM'),
					secure: true,
					auth: {
						user: configService.get<string>('MAIL_USER'),
						pass: configService.get<string>('MAIL_PASS')
					}
				});
			}
		}
	],
	exports: [IMailService]
})
export class MailModule {}
