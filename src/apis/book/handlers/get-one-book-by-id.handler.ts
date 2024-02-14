import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetOneBookByIdCommand } from '../commands/get-one-book-by-id.command';
import { IBookService } from '../book.interface';

@CommandHandler(GetOneBookByIdCommand)
export class GetOneBookByIdHandler implements ICommandHandler<GetOneBookByIdCommand> {
	private logger = new Logger(GetOneBookByIdHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: GetOneBookByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.bookService.getOneByIdOrFail(id);
	}
}
