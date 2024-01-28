import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { IJwtService } from './jwt.interface';
import { JwtService } from './jwt.service';

@Global()
@Module({
	imports: [
		NestJwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: () => ({
				global: true
			})
		})
	],
	providers: [
		{
			provide: IJwtService,
			useClass: JwtService
		}
	],
	exports: [IJwtService]
})
export class JwtModule {}
