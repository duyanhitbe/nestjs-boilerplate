import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../commands/create-book.command';
import { IBookService } from '../book.interface';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
	private logger = new Logger(CreateBookHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: CreateBookCommand) {
		this.logger.debug('execute');
		const { data } = command;
		return this.bookService.create(data);
	}
}
