import { UpdateBookByIdInput } from '../dto/update-book-by-id.input';

export class UpdateBookByIdCommand {
	id!: string;
	data!: UpdateBookByIdInput;

	constructor(data: UpdateBookByIdCommand) {
		Object.assign(this, data);
	}
}
