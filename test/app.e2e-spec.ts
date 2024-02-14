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

	it('/ (GET)', () => {
		const name = packageJson.name;
		const version = packageJson.version;
		return request(app.getHttpServer()).get('/').expect(200).expect(`${name} v${version}`);
	});
});
