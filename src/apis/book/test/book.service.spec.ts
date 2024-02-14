import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

const mockBookRepository = jest.fn().mockReturnValue({});

describe('BookService', () => {
	let service: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IBookService,
					useClass: BookService
				},
				{
					provide: getRepositoryToken(BookEntity),
					useValue: mockBookRepository
				}
			]
		}).compile();

		service = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
