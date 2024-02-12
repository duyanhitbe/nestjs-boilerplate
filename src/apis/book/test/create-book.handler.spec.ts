import { IUserService } from '@apis/user/user.interface';
import { UserService } from '@apis/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { CreateBookCommand } from '../commands/create-book.command';
import { CreateBookHandler } from '../handlers/create-book.handler';

jest.mock('../book.service');
jest.mock('../../user/user.service');

describe('CreateBookHandler', () => {
	let handler: CreateBookHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateBookHandler,
				{
					provide: IBookService,
					useClass: BookService
				},
				{
					provide: IUserService,
					useClass: UserService
				}
			]
		}).compile();

		handler = module.get<CreateBookHandler>(CreateBookHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.create with the provided data', async () => {
		const createBookCommand = new CreateBookCommand({
			data: {
				name: 'Harry Potter',
				userId: '123'
			}
		});

		await handler.execute(createBookCommand);
		const { data } = createBookCommand;

		expect(bookService.create).toHaveBeenCalledWith(data);
	});
});
