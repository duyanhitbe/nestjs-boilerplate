import { BaseAuthEntity, BaseAuthService } from '@apis/auth/auth.interface';
import { BaseService } from '@common';
import { UserModel } from './models/user.model';

export abstract class IUserService extends BaseService<UserModel> implements BaseAuthService {
    abstract validateUserByUsernamePassword(username: string, password: string): Promise<UserModel>;
    abstract validateUserById(id: string): Promise<BaseAuthEntity>;
}