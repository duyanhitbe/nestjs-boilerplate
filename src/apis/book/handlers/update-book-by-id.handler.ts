import { IUserService } from '@apis/user/user.interface';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { UpdateBookByIdCommand } from '../commands/update-book-by-id.command';

@CommandHandler(UpdateBookByIdCommand)
export class UpdateBookByIdHandler implements ICommandHandler<UpdateBookByIdCommand> {
	private logger = new Logger(UpdateBookByIdHandler.name);

	constructor(
		private readonly bookService: IBookService,
		private readonly userService: IUserService
	) {}

	async execute(command: UpdateBookByIdCommand) {
		this.logger.log(command);
		const { id, data } = command;
		const { userId } = data;
		if (userId) {
			//Validate userId
			await this.userService.getOneByIdOrFail(userId);
		}
		return this.bookService.updateById(id, data, { relations: ['user'] });
	}
}
