import { IJwtService } from '@modules/jwt';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../commands/login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	private logger = new Logger(LoginHandler.name);

	constructor(private readonly jwtService: IJwtService) {}

	async execute(command: LoginCommand) {
		this.logger.debug('execute');
		const { user } = command;
		const payload: JwtPayload = {
			id: user.id
		};
		const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60; // 60 phút
		const options = { expiresIn };
		const accessToken = await this.jwtService.sign(payload, options);
		return { accessToken, expiresIn };
	}
}
