import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
export const adminUsername = configService.get<string>('ADMIN_USERNAME');
export const adminPassword = configService.get<string>('ADMIN_PASSWORD');
export const schema = configService.get<string>('DB_SCHEMA');
