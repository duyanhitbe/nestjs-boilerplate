import { Controller } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
	constructor(private readonly cronService: CronService) {}
}
