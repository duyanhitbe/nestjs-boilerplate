import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand } from './commands/create-user.command';
import { GetAllUserPaginatedCommand } from './commands/get-all-user-paginated.command';
import { GetOneUserByIdCommand } from './commands/get-one-user-by-id.command';
import { RemoveUserByIdCommand } from './commands/remove-user-by-id.command';
import { UpdateUserByIdCommand } from './commands/update-user-by-id.command';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserByIdInput } from './dto/update-user-by-id.input';
import { UserModel } from './models/user.model';
import { GetAllUserArgs, UserPaginated } from './user.schema';

@Resolver(() => UserModel)
export class UserResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Query(() => UserPaginated)
	getAllUserPaginated(@Args('query', { nullable: true }) query: GetAllUserArgs) {
		return this.commandBus.execute(new GetAllUserPaginatedCommand({ query }));
	}

	@Query(() => UserModel)
	getOneUser(@Args('id') id: string) {
		return this.commandBus.execute(new GetOneUserByIdCommand({ id }));
	}

	@Mutation(() => UserModel)
	createUser(@Args('data') data: CreateUserInput) {
		return this.commandBus.execute(new CreateUserCommand({ data }));
	}

	@Mutation(() => UserModel)
	updateUser(
		@Args('id') id: string,
		@Args('data', { nullable: true }) data: UpdateUserByIdInput
	) {
		return this.commandBus.execute(new UpdateUserByIdCommand({ id, data }));
	}

	@Mutation(() => UserModel)
	removeUser(@Args('id') id: string) {
		return this.commandBus.execute(new RemoveUserByIdCommand({ id }));
	}
}
