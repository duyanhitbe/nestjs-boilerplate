import { BaseResponse, IPagination } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserResponse extends BaseResponse {
	/** Tài khoản đăng nhập */
	@ApiProperty({ description: 'Tài khoản đăng nhập' })
	@Expose()
	username!: string;
}

export class UserPaginatedResponse {
	@Expose()
	@Type(() => UserResponse)
	data!: UserResponse[];

	@Expose()
	pagination!: IPagination;
}
