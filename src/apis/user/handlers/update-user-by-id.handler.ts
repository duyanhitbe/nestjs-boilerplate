import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserByIdCommand } from '../commands/update-user-by-id.command';
import { IUserService } from '../user.interface';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdHandler implements ICommandHandler<UpdateUserByIdCommand> {
	private logger = new Logger(UpdateUserByIdHandler.name);

	constructor(private readonly userService: IUserService) {}

	async execute(command: UpdateUserByIdCommand) {
		this.logger.log(command);
		const { id, data } = command;
		return this.userService.updateById(id, data);
	}
}
