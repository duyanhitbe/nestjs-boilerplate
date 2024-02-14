import { IBookService } from '@apis/book/book.interface';
import { CreateBookInput } from '@apis/book/dto/create-book.input';
import { UpdateBookByIdInput } from '@apis/book/dto/update-book-by-id.input';
import { AppModule } from '@app/app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('BookController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let bookService: IBookService;

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
		await bookService.softRemoveAll();
	});

	it('/v1/book (GET)', async () => {
		const book1 = await bookService.create({});
		const book2 = await bookService.create({});
		return request(httpServer)
			.get('/v1/book')
			.query({ limit: '1', page: '2' })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(book2.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(2);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/book/:id (GET)', async () => {
		const book = await bookService.create({});
		return request(httpServer)
			.get(`/v1/book/${book.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
	it('/v1/book (POST)', () => {
		const createBookData: CreateBookInput = {
			name: 'Harry Potter',
			userId: ''
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
		const book = await bookService.create({});
		const updateBookData: UpdateBookByIdInput = {};
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
		const book = await bookService.create({});
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
