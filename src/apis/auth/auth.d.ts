import { UserEntity } from '@apis/user/entities/user.entity';

declare global {
	type UserType = 'user';
	type User = UserEntity;

	type UserJwtPayload = {
		id: string;
	};
	type JwtPayload = UserJwtPayload;
}

export {};
