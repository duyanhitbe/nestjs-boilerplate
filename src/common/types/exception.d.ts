declare global {
	interface HttpExceptionResponse {
		statusCode: number;
		error: string;
		message: any;
	}
}

export {};
