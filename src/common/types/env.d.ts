declare global {
	type Env = 'dev' | 'staging' | 'production' | 'local';
	namespace NodeJS {
		interface ProcessEnv {
			/** Môi trường */
			NODE_ENV: Env;
			/** Port của app */
			PORT: number;
			/** Tên schema của database */
			SCHEMA: string;
			/** URL của database */
			MONGO_URL: string;
			/** Mã bí mật jwt */
			SECRET_JWT: string;
			/** Host của redis */
			REDIS_HOST: string;
			/** Port của redis */
			REDIS_PORT: string;
			/** IndexDB của redis */
			REDIS_DB: string;
			/** Password của redis */
			REDIS_PASSWORD: string;
			/** Prefix của redis */
			REDIS_PREFIX: string;
			/** Host của mail */
			MAIL_HOST: string;
			/** Mail gửi đi */
			MAIL_FROM: string;
			/** User của mail */
			MAIL_USER: string;
			/** Password của mail */
			MAIL_PASS: string;
		}
	}
}

export {};
