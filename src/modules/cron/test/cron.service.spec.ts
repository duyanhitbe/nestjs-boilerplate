import { Test, TestingModule } from '@nestjs/testing';
import { ICronService } from '../cron.interface';
import { CronService } from '../cron.service';

describe('CronService', () => {
	let service: ICronService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ICronService,
					useClass: CronService
				}
			]
		}).compile();

		service = module.get<ICronService>(ICronService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
