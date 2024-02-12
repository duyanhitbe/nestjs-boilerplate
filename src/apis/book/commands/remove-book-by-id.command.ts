export class RemoveBookByIdCommand {
	id!: string;

	constructor(data: RemoveBookByIdCommand) {
		Object.assign(this, data);
	}
}
