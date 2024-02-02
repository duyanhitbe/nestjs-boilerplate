import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserByIdDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}
