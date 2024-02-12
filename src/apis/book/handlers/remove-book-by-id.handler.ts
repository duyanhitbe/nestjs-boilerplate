import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveBookByIdCommand } from '../commands/remove-book-by-id.command';
import { IBookService } from '../book.interface';

@CommandHandler(RemoveBookByIdCommand)
export class RemoveBookByIdHandler implements ICommandHandler<RemoveBookByIdCommand> {
	private logger = new Logger(RemoveBookByIdHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: RemoveBookByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.bookService.softRemoveById(id);
	}
}
