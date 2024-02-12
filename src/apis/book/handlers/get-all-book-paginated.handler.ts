import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { GetAllBookPaginatedCommand } from '../commands/get-all-book-paginated.command';

@CommandHandler(GetAllBookPaginatedCommand)
export class GetAllBookPaginatedHandler implements ICommandHandler<GetAllBookPaginatedCommand> {
	private logger = new Logger(GetAllBookPaginatedHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: GetAllBookPaginatedCommand) {
		this.logger.log(command);
		const { query } = command;
		return this.bookService.getAllPaginated({
			...query,
			relations: ['user']
		});
	}
}
