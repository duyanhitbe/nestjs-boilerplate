import { UseUserGuard } from '@common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand } from './commands/create-user.command';
import { GetAllUserPaginatedCommand } from './commands/get-all-user-paginated.command';
import { GetOneUserByIdCommand } from './commands/get-one-user-by-id.command';
import { RemoveUserByIdCommand } from './commands/remove-user-by-id.command';
import { UpdateUserByIdCommand } from './commands/update-user-by-id.command';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserByIdInput } from './dto/update-user-by-id.input';
import { UserEntity } from './entities/user.entity';
import { GetAllUserArgs, UserPaginated } from './user.schema';

@Resolver(() => UserEntity)
@UseUserGuard()
export class UserResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Query(() => UserPaginated)
	getAllUserPaginated(@Args('query', { nullable: true }) query: GetAllUserArgs) {
		return this.commandBus.execute(new GetAllUserPaginatedCommand({ query }));
	}

	@Query(() => UserEntity)
	getOneUser(@Args('id') id: string) {
		return this.commandBus.execute(new GetOneUserByIdCommand({ id }));
	}

	@Mutation(() => UserEntity)
	createUser(@Args('data') data: CreateUserInput) {
		return this.commandBus.execute(new CreateUserCommand({ data }));
	}

	@Mutation(() => UserEntity)
	updateUser(
		@Args('id') id: string,
		@Args('data', { nullable: true }) data: UpdateUserByIdInput
	) {
		return this.commandBus.execute(new UpdateUserByIdCommand({ id, data }));
	}

	@Mutation(() => UserEntity)
	removeUser(@Args('id') id: string) {
		return this.commandBus.execute(new RemoveUserByIdCommand({ id }));
	}
}
