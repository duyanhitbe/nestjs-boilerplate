import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './cron.controller';
import { ICronService } from './cron.interface';
import { CronService } from './cron.service';

@Module({
	imports: [ScheduleModule.forRoot()],
	controllers: [CronController],
	providers: [
		{
			provide: ICronService,
			useClass: CronService
		}
	]
})
export class CronModule {}
