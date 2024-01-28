import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { IUserService } from '../user.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	private logger = new Logger(CreateUserHandler.name);

	constructor(private readonly userService: IUserService) {}

	async execute(command: CreateUserCommand) {
		this.logger.debug('execute');
		const { data } = command;
		return this.userService.create(data);
	}
}
