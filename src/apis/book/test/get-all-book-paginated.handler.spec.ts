import { Test, TestingModule } from '@nestjs/testing';
import { GetAllBookPaginatedCommand } from '../commands/get-all-book-paginated.command';
import { GetAllBookPaginatedHandler } from '../handlers/get-all-book-paginated.handler';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

jest.mock('../book.service');

describe('GetAllBookPaginatedHandler', () => {
	let handler: GetAllBookPaginatedHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetAllBookPaginatedHandler,
				{
					provide: IBookService,
					useClass: BookService
				}
			]
		}).compile();

		handler = module.get<GetAllBookPaginatedHandler>(GetAllBookPaginatedHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.getAllPaginated with the provided query', async () => {
		const getAllBookPaginatedCommand = new GetAllBookPaginatedCommand({
			query: {
				limit: 10,
				page: 1
			}
		});

		await handler.execute(getAllBookPaginatedCommand);
		const { query } = getAllBookPaginatedCommand;

		expect(bookService.getAllPaginated).toHaveBeenCalledWith({
			...query,
			relations: ['user']
		});
	});
});
