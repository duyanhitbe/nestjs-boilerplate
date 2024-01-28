export class LoginCommand {
	user!: User;

	constructor(data: LoginCommand) {
		Object.assign(this, data);
	}
}
