import { ApiModule } from '@apis/api.module';
import { ConfigModule, CronModule, DatabaseModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { I18NModule } from './modules/i18n/i18n.module';

@Module({
	imports: [
		ConfigModule,
		CronModule,
		DatabaseModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: () => ({
				global: true
			})
		}),
		EventEmitterModule.forRoot({
			maxListeners: 20
		}),
		I18NModule,
		ApiModule
	],
	controllers: [AppController],
	providers
})
export class AppModule {}
