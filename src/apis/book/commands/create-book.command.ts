import { CreateBookDto } from '../dto/create-book.dto';

export class CreateBookCommand {
	data!: CreateBookDto;

	constructor(data: CreateBookCommand) {
		Object.assign(this, data);
	}
}
