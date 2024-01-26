export class ValidationHelper {
	/** Kiểm tra value có phải uuid hay không */
	static isUuid(value: string) {
		const uuidPattern =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		return uuidPattern.test(value);
	}
}
