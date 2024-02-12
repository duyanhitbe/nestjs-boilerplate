import { IBookService } from '@apis/book/book.interface';
import { CreateBookDto } from '@apis/book/dto/create-book.dto';
import { UpdateBookByIdDto } from '@apis/book/dto/update-book-by-id.dto';
import { UserEntity } from '@apis/user/entities/user.entity';
import { IUserService } from '@apis/user/user.interface';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('BookController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let bookService: IBookService;
	let userService: IUserService;
	let user: UserEntity;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		httpServer = app.getHttpServer();
		app.enableCors({
			origin: true,
			credentials: true
		});
		app.enableVersioning({
			type: VersioningType.URI,
			defaultVersion: '1'
		});
		await app.init();

		//Remove all book
		bookService = app.get<IBookService>(IBookService);
		userService = app.get<IUserService>(IUserService);
		await userService.softRemoveAll();
		await bookService.softRemoveAll();
		user = await userService.create({
			username: 'username',
			password: 'password'
		});
	});

	afterAll(() => {
		app.close();
	});

	it('/v1/book (GET)', async () => {
		const book1 = await bookService.create({
			name: 'God Father',
			userId: user.id
		});
		const book2 = await bookService.create({
			name: 'Self Help',
			userId: user.id
		});
		return request(httpServer)
			.get('/v1/book')
			.query({ limit: 1, page: 2 })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(book1.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(2);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/book/:id (GET)', async () => {
		const book = await bookService.create({
			name: 'God Father',
			userId: user.id
		});
		return request(httpServer)
			.get(`/v1/book/${book.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
	it('/v1/book (POST)', async () => {
		const createBookData: CreateBookDto = {
			name: 'Harry Potter',
			userId: user.id
		};
		return request(httpServer)
			.post('/v1/book')
			.send(createBookData)
			.expect(201)
			.then(({ body }) => {
				expect(body.status).toEqual(201);
				expect(body.message).toEqual('success');
			});
	});
	it('/v1/book/:id (PATCH)', async () => {
		const book = await bookService.create({
			name: 'God Father',
			userId: user.id
		});
		const updateBookData: UpdateBookByIdDto = {};
		return request(httpServer)
			.patch(`/v1/book/${book.id}`)
			.send(updateBookData)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
	it('/v1/book/:id (DELETE)', async () => {
		const book = await bookService.create({
			name: 'God Father',
			userId: user.id
		});
		return request(httpServer)
			.patch(`/v1/book/${book.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
});
