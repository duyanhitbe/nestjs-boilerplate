import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { GetOneBookByIdCommand } from '../commands/get-one-book-by-id.command';
import { GetOneBookByIdHandler } from '../handlers/get-one-book-by-id.handler';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

jest.mock('../book.service');

describe('GetOneBookByIdHandler', () => {
	let handler: GetOneBookByIdHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetOneBookByIdHandler,
				{
					provide: IBookService,
					useClass: BookService
				}
			]
		}).compile();

		handler = module.get<GetOneBookByIdHandler>(GetOneBookByIdHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.getOneByIdOrFail with the provided id', async () => {
		const getOneBookByIdCommand = new GetOneBookByIdCommand({
			id: uuidv4()
		});

		await handler.execute(getOneBookByIdCommand);
		const { id } = getOneBookByIdCommand;

		expect(bookService.getOneByIdOrFail).toHaveBeenCalledWith(id, {
			relations: ['user']
		});
	});
});
