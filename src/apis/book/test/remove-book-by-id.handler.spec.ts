import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { RemoveBookByIdCommand } from '../commands/remove-book-by-id.command';
import { RemoveBookByIdHandler } from '../handlers/remove-book-by-id.handler';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

jest.mock('../book.service');

describe('RemoveBookByIdHandler', () => {
	let handler: RemoveBookByIdHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RemoveBookByIdHandler,
				{
					provide: IBookService,
					useClass: BookService
				}
			]
		}).compile();

		handler = module.get<RemoveBookByIdHandler>(RemoveBookByIdHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.softRemoveById with the provided id', async () => {
		const removeBookByIdCommand = new RemoveBookByIdCommand({
			id: uuidv4()
		});

		await handler.execute(removeBookByIdCommand);
		const { id } = removeBookByIdCommand;

		expect(bookService.softRemoveById).toHaveBeenCalledWith(id);
	});
});
