import { CreateUserDto } from '@apis/user/dto/create-user.dto';
import { UpdateUserByIdDto } from '@apis/user/dto/update-user-by-id.dto';
import { IUserService } from '@apis/user/user.interface';
import { UserEntity } from '@app/apis/user/entities/user.entity';
import { AppModule } from '@app/app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
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

		//Remove all user
		userService = app.get<IUserService>(IUserService);
		await userService.softRemoveAll();
		user = await userService.create({
			username: 'username',
			password: 'password'
		});
	});

	afterAll(async () => {
		await userService.softRemoveAll();
		await app.close();
	});

	it('/v1/user (GET)', async () => {
		await userService.create({
			username: 'user',
			password: 'strongPassword'
		});

		return request(httpServer)
			.get('/v1/user')
			.query({ limit: 1, page: 1, order: JSON.stringify({ createdAt: 'asc' }) })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(user.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(1);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/user/:id (GET)', async () => {
		return request(httpServer)
			.get(`/v1/user/${user.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(user.id);
				expect(body.data.username).toEqual(user.username);
			});
	});
	it('/v1/user (POST)', () => {
		const createUserData: CreateUserDto = {
			username: 'user',
			password: 'strongPassword'
		};
		return request(httpServer)
			.post('/v1/user')
			.send(createUserData)
			.expect(201)
			.then(({ body }) => {
				expect(body.status).toEqual(201);
				expect(body.message).toEqual('success');
				expect(body.data.username).toEqual(createUserData.username);
			});
	});
	it('/v1/user/:id (PATCH)', async () => {
		const updatedUsername = 'updatedUsername';
		const updateUserData: UpdateUserByIdDto = {
			username: updatedUsername
		};
		return request(httpServer)
			.patch(`/v1/user/${user.id}`)
			.send(updateUserData)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(user.id);
				expect(body.data.username).toEqual(updatedUsername);
			});
	});
	it('/v1/user/:id (DELETE)', async () => {
		return request(httpServer)
			.patch(`/v1/user/${user.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(user.id);
				expect(body.data.username).toEqual(user.username);
			});
	});
});
