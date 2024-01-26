declare global {
	type SendMailPayload = {
		to: string;
		subject?: string;
		html?: string;
	};

	type GetOTPTemplatePayload = {
		otp: string;
		expiresInMinute: number;
	};

	type SendOTPPayload = SendMailPayload & GetOTPTemplatePayload;
}

export {};
