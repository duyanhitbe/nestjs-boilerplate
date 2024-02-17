import { IUserService } from '@apis/user/user.interface';
import { UserService } from '@apis/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { UpdateBookByIdCommand } from '../commands/update-book-by-id.command';
import { UpdateBookByIdHandler } from '../handlers/update-book-by-id.handler';

jest.mock('../book.service');
jest.mock('../../user/user.service');

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
				},
				{
					provide: IUserService,
					useClass: UserService
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
			data: {
				name: 'updated',
				userId: '1'
			}
		});

		await handler.execute(updateBookByIdCommand);
		const { id, data } = updateBookByIdCommand;

		expect(bookService.updateById).toHaveBeenCalledWith(id, data, {
			relations: ['user']
		});
	});
});
