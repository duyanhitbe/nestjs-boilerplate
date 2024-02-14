import { CreateBookInput } from '../dto/create-book.input';

export class CreateBookCommand {
	data!: CreateBookInput;

	constructor(data: CreateBookCommand) {
		Object.assign(this, data);
	}
}
