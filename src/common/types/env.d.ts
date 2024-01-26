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
			/** Host của database */
			DB_HOST: string;
			/** Port của database */
			DB_PORT: number;
			/** Username của database */
			DB_USERNAME: string;
			/** Password của database */
			DB_PASSWORD: string;
			/** Tên của database */
			DB_NAME: string;
			/** Mã bí mật jwt */
			SECRET_JWT: string;
		}
	}
}

export {};
