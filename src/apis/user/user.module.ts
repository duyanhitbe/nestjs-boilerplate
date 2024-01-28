import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserHandler } from './handlers/create-user.handler';
import { GetAllUserPaginatedHandler } from './handlers/get-all-user-paginated.handler';
import { GetOneUserByIdHandler } from './handlers/get-one-user-by-id.handler';
import { RemoveUserByIdHandler } from './handlers/remove-user-by-id.handler';
import { UpdateUserByIdHandler } from './handlers/update-user-by-id.handler';
import { UserController } from './user.controller';
import { IUserService } from './user.interface';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [
		{
			provide: IUserService,
			useClass: UserService
		},
		CreateUserHandler,
		GetAllUserPaginatedHandler,
		GetOneUserByIdHandler,
		RemoveUserByIdHandler,
		UpdateUserByIdHandler
	],
	exports: [IUserService]
})
export class UserModule {}
