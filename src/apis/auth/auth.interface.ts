import { BaseEntity } from "@common";

export abstract class IAuthService {
    /** 
     * Lấy service theo loại user
     * @param userType Loại user
     * @return BaseAuthService
     * @example this.authService.getService('user')
     */
    abstract getService(userType: UserType): BaseAuthService;
}

export interface BaseAuthService {
    /** 
     * Kiểm tra và trả về một user
     * @param username Tài khoản đăng nhập
     * @param password Mật khẩu
     * @return Promise<BaseAuthEntity>
     * @example this.authService.getService('user').validateUserByUsernamePassword(username, password)
     */
    validateUserByUsernamePassword(username: string, password: string): Promise<BaseAuthEntity>;

    /** 
     * Kiểm tra và trả về một user
     * @param id id của tài khoản
     * @return Promise<BaseAuthEntity>
     * @example this.authService.getService('user').validateUserById(uuid)
     */
    validateUserById(id: string): Promise<BaseAuthEntity>;
}

export class BaseAuthEntity extends BaseEntity {
    username!: string;
    password!: string;
}