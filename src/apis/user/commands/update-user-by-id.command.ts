import { UpdateUserByIdInput } from '../dto/update-user-by-id.input';

export class UpdateUserByIdCommand {
	id!: string;
	data!: UpdateUserByIdInput;

	constructor(data: UpdateUserByIdCommand) {
		Object.assign(this, data);
	}
}
