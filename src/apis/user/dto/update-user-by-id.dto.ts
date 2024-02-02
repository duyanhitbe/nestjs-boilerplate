import { PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';

export class UpdateUserByIdDto extends PartialType(CreateUserInput) {}
