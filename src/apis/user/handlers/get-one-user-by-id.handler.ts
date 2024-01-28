import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetOneUserByIdCommand } from '../commands/get-one-user-by-id.command';
import { IUserService } from '../user.interface';

@CommandHandler(GetOneUserByIdCommand)
export class GetOneUserByIdHandler implements ICommandHandler<GetOneUserByIdCommand> {
	private logger = new Logger(GetOneUserByIdHandler.name);

	constructor(private readonly userService: IUserService) {}

	async execute(command: GetOneUserByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.userService.getOneByIdOrFail(id);
	}
}
