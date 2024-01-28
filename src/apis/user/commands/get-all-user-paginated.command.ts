import { PaginationDto } from '@common';

export class GetAllUserPaginatedCommand {
	query!: PaginationDto;

	constructor(data: GetAllUserPaginatedCommand) {
		Object.assign(this, data);
	}
}
