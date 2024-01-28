import {
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	HideController,
	PaginationDto
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserByIdDto } from './dto/update-user-by-id.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { GetAllUserPaginatedCommand } from './commands/get-all-user-paginated.command';
import { GetOneUserByIdCommand } from './commands/get-one-user-by-id.command';
import { RemoveUserByIdCommand } from './commands/remove-user-by-id.command';
import { UpdateUserByIdCommand } from './commands/update-user-by-id.command';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('User API')
@HideController()
export class UserController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	@ApiCreate(UserEntity, 'User')
	create(@Body() createUserDto: CreateUserDto) {
		return this.commandBus.execute(new CreateUserCommand({ data: createUserDto }));
	}

	@Get()
	@ApiGetAll(UserEntity, 'User')
	getAll(@Query() query: PaginationDto) {
		return this.commandBus.execute(new GetAllUserPaginatedCommand({ query }));
	}

	@Get(':id')
	@ApiGetOne(UserEntity, 'User')
	@ApiParam({ name: 'id', description: 'Truyền all nếu muốn lấy tất cả' })
	getOne(@Param('id') id: string) {
		return this.commandBus.execute(new GetOneUserByIdCommand({ id }));
	}

	@Patch(':id')
	@ApiUpdate(UserEntity, 'User')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserByIdDto) {
		return this.commandBus.execute(new UpdateUserByIdCommand({ id, data: updateUserDto }));
	}

	@Delete(':id')
	@ApiDelete(UserEntity, 'User')
	remove(@Param('id') id: string) {
		return this.commandBus.execute(new RemoveUserByIdCommand({ id }));
	}
}
