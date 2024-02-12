import { UserResponse } from '@apis/user/dto/user-response.dto';
import { BaseResponse, IPagination } from '@common';
import { Expose, Type } from 'class-transformer';

export class BookResponse extends BaseResponse {
	@Expose()
	name!: string;

	@Expose()
	@Type(() => String)
	userId!: string;

	@Expose()
	@Type(() => UserResponse)
	user!: UserResponse;
}

export class BookPaginatedResponse {
	@Expose()
	@Type(() => BookResponse)
	data!: BookResponse[];

	@Expose()
	pagination!: IPagination;
}
