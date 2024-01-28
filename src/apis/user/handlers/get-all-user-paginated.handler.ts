import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetAllUserPaginatedCommand } from '../commands/get-all-user-paginated.command';
import { IUserService } from '../user.interface';

@CommandHandler(GetAllUserPaginatedCommand)
export class GetAllUserPaginatedHandler implements ICommandHandler<GetAllUserPaginatedCommand> {
	private logger = new Logger(GetAllUserPaginatedHandler.name);

	constructor(private readonly userService: IUserService) {}

	async execute(command: GetAllUserPaginatedCommand) {
		this.logger.log(command);
		const { query } = command;
		return this.userService.getAllPaginated(query);
	}
}
