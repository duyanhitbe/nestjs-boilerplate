import { CreateUserInput } from '../dto/create-user.input';

export class CreateUserCommand {
	data!: CreateUserInput;

	constructor(data: CreateUserCommand) {
		Object.assign(this, data);
	}
}
