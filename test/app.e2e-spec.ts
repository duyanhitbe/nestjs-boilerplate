import { AppModule } from '@app/app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as packageJson from 'packageJson';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		app.enableCors({
			origin: true,
			credentials: true
		});
		app.enableVersioning({
			type: VersioningType.URI,
			defaultVersion: '1'
		});
		await app.init();
	});

	afterAll(() => {
		app.close();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.then(({ body }) => {
				const name = packageJson.name;
				const version = packageJson.version;
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data).toEqual(`${name} v${version}`);
			});
	});
});
