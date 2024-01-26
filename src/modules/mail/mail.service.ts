import { MetadataKey } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getOtpTemplate } from './mail.helper';

@Injectable()
export class MailService {
	constructor(
		@Inject(MetadataKey.NODEMAILER)
		private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>
	) {}

	async sendMail(payload: SendMailPayload) {
		return this.transporter.sendMail(payload);
	}

	async sendOTP(payload: SendOTPPayload) {
		const template = getOtpTemplate(payload);
		return this.sendMail({
			...payload,
			subject: 'Minigame forgot password',
			html: template
		});
	}
}
