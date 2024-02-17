import { Controller } from '@nestjs/common';
import { ICronService } from './cron.interface';

@Controller('cron')
export class CronController {
	constructor(private readonly cronService: ICronService) {}
}
