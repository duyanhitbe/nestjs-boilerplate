import { PaginationDto } from '@common';
import { UserEntity } from '../entities/user.entity';

export class GetAllUserPaginatedCommand {
	query!: PaginationDto<UserEntity>;

	constructor(data: GetAllUserPaginatedCommand) {
		Object.assign(this, data);
	}
}
