import { CountryCode, isPossiblePhoneNumber, parsePhoneNumber } from 'libphonenumber-js/max';

enum PhoneNumberFormat {
	NATIONAL = 'NATIONAL',
	E164 = 'E.164'
}
enum PhoneNumberType {
	MOBILE = 'MOBILE'
}

export class PhoneHelper {
	static readonly PhoneNumberFormat = PhoneNumberFormat;
	static readonly NumberType = PhoneNumberType;

	private static parsePhoneNumber(phoneNumber: string, regionCode = 'VN') {
		return parsePhoneNumber(phoneNumber, regionCode as any);
	}

	private static isPossiblePhoneNumber(phoneNumber: string, regionCode = 'VN') {
		return isPossiblePhoneNumber(phoneNumber, regionCode as any);
	}

	static isMobile(phoneNumber: string, regionCode: CountryCode = 'VN') {
		if (!PhoneHelper.isPossiblePhoneNumber(phoneNumber, regionCode)) return false;
		if (
			PhoneHelper.parsePhoneNumber(phoneNumber, regionCode).getType() !==
			PhoneHelper.NumberType.MOBILE
		)
			return false;
		return true;
	}
	static getNumber(type: PhoneNumberFormat, phoneNumber: string, regionCode = 'VN') {
		const phone = PhoneHelper.parsePhoneNumber(phoneNumber, regionCode);
		if (!phone) return null;

		switch (type) {
			case PhoneHelper.PhoneNumberFormat.E164:
				return phone.format(PhoneHelper.PhoneNumberFormat.E164);
			case PhoneHelper.PhoneNumberFormat.NATIONAL:
				return phone.format(PhoneHelper.PhoneNumberFormat.NATIONAL).replace(/ /g, '');
			default:
				return null;
		}
	}
}
