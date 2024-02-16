import { ApiModule } from '@apis/api.module';
import { LoggerMiddleware } from '@common';
import { ConfigModule } from '@modules/configs';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database';
import { I18NModule } from '@modules/i18n';
import { JwtModule } from '@modules/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { providers } from './app.provider';

@Module({
	imports: [
		ConfigModule,
		CronModule,
		DatabaseModule,
		JwtModule,
		EventEmitterModule.forRoot({
			maxListeners: 20
		}),
		I18NModule,
		CqrsModule.forRoot(),
		ApiModule
	],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
