import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUserCommand {
	data!: CreateUserDto;

	constructor(data: CreateUserCommand) {
		Object.assign(this, data);
	}
}
