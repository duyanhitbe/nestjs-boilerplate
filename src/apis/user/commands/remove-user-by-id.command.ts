export class RemoveUserByIdCommand {
	id!: string;

	constructor(data: RemoveUserByIdCommand) {
		Object.assign(this, data);
	}
}
