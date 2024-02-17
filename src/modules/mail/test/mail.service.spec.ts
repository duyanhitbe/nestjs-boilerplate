import { MetadataKey } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IMailService } from '../mail.interface';
import { MailService } from '../mail.service';
import { getOtpTemplate } from '../mail.helper';

const mockTransporter = jest.fn(() => ({
	sendMail: jest.fn((payload: SendMailPayload) => Promise.resolve(payload))
}));

describe('MailService', () => {
	let service: IMailService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: MetadataKey.NODEMAILER,
					useFactory: mockTransporter
				},
				{
					provide: IMailService,
					useClass: MailService
				}
			]
		}).compile();

		service = module.get<IMailService>(IMailService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('sendOTP', () => {
		const payload: SendOTPPayload = {
			to: 'test@gmail.com',
			otp: '123456',
			expiresInMinute: 5
		};
		it('should send email', async () => {
			const result = await service.sendOTP(payload);
			const template = getOtpTemplate(payload);
			expect(result.html).toEqual(template);
			expect(result.subject).toEqual('Forgot password');
			expect(result.to).toEqual(payload.to);
			expect(result.otp).toEqual(payload.otp);
			expect(result.expiresInMinute).toEqual(payload.expiresInMinute);
		});
	});
});
