import { PaginationDto } from '@common';

export class GetAllBookPaginatedCommand {
	query!: PaginationDto;

	constructor(data: GetAllBookPaginatedCommand) {
		Object.assign(this, data);
	}
}
