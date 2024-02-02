import { GetAllUserArgs } from '../user.schema';

export class GetAllUserPaginatedCommand {
	query!: GetAllUserArgs;

	constructor(data: GetAllUserPaginatedCommand) {
		Object.assign(this, data);
	}
}
