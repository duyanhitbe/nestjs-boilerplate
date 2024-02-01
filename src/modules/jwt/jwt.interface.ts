import { JwtSignOptions } from "@nestjs/jwt";

export abstract class IJwtService {
    /** 
	 * Generate access token
	 * @param payload Data truyền vào token
	 * @param options Những cài đặt về thời gian hết hạn...
	 * @return Promise<string>
	 * @example const accessToken = await this.jwtService.sign({ id: uuid }, { expiresIn: '1 day' });
	 */
	abstract sign(payload: JwtPayload, options?: Omit<JwtSignOptions, 'secret'>): Promise<string>;

    /** 
	 * Verify access token
     * @param token Access token
     * @return Promise<JwtPayload>
     * @example const payload = await this.jwtService.verify(token);
     */
	abstract verify(token: string): Promise<JwtPayload>;
}