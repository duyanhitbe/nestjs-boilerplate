import { BaseAuthEntity, BaseAuthService } from '@apis/auth/auth.interface';
import { BaseService } from '@common';
import { UserEntity } from './entities/user.entity';

export abstract class IUserService extends BaseService<UserEntity> implements BaseAuthService {
    abstract validateUserByUsernamePassword(username: string, password: string): Promise<UserEntity>;
    abstract validateUserById(id: string): Promise<BaseAuthEntity>;
}
