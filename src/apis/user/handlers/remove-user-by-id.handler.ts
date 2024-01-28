import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserByIdCommand } from '../commands/remove-user-by-id.command';
import { IUserService } from '../user.interface';

@CommandHandler(RemoveUserByIdCommand)
export class RemoveUserByIdHandler implements ICommandHandler<RemoveUserByIdCommand> {
	private logger = new Logger(RemoveUserByIdHandler.name);

	constructor(private readonly userService: IUserService) {}

	async execute(command: RemoveUserByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.userService.softRemoveById(id);
	}
}
