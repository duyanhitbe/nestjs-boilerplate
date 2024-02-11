export class GetOneBookByIdCommand {
	id!: string;

	constructor(data: GetOneBookByIdCommand) {
		Object.assign(this, data);
	}
}
