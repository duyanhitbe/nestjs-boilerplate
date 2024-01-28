export class GetOneUserByIdCommand {
	id!: string;

	constructor(data: GetOneUserByIdCommand) {
		Object.assign(this, data);
	}
}
