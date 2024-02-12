import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookByIdCommand } from '../commands/update-book-by-id.command';
import { UpdateBookByIdHandler } from '../handlers/update-book-by-id.handler';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

jest.mock('../book.service');

describe('UpdateBookByIdHandler', () => {
	let handler: UpdateBookByIdHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateBookByIdHandler,
				{
					provide: IBookService,
					useClass: BookService
				}
			]
		}).compile();

		handler = module.get<UpdateBookByIdHandler>(UpdateBookByIdHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.create with the provided data', async () => {
		const updateBookByIdCommand = new UpdateBookByIdCommand({
			id: uuidv4(),
			data: {}
		});

		await handler.execute(updateBookByIdCommand);
		const { id, data } = updateBookByIdCommand;

		expect(bookService.updateById).toHaveBeenCalledWith(id, data);
	});
});
