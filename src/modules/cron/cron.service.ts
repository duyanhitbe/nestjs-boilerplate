import { Injectable, Logger } from '@nestjs/common';
import { ICronService } from './cron.interface';

@Injectable()
export class CronService extends ICronService {
	private readonly logger = new Logger(CronService.name);
}
