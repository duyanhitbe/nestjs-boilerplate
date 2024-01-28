import { UpdateUserByIdDto } from '../dto/update-user-by-id.dto';

export class UpdateUserByIdCommand {
	id!: string;
	data!: UpdateUserByIdDto;

	constructor(data: UpdateUserByIdCommand) {
		Object.assign(this, data);
	}
}
