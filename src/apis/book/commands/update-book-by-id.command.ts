import { UpdateBookByIdDto } from '../dto/update-book-by-id.dto';

export class UpdateBookByIdCommand {
	id!: string;
	data!: UpdateBookByIdDto;

	constructor(data: UpdateBookByIdCommand) {
		Object.assign(this, data);
	}
}
