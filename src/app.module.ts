import { ApiModule } from '@apis/api.module';
import { ConfigModule, CronModule, DatabaseModule, JwtModule } from '@modules';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { I18NModule } from './modules/i18n/i18n.module';

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
