export abstract class IMailService {
    /**
     * Gửi email OTP
     * @param payload Payload gửi email OTP
     * @return Promise<any>
     * @example this.mailService.sendOTP(payload);
     */
    abstract sendOTP(payload: SendOTPPayload): Promise<any>;
}