export const MailService = jest.fn().mockReturnValue({
	sendOTP: jest.fn((_payload: SendOTPPayload) => Promise.resolve('success'))
});
