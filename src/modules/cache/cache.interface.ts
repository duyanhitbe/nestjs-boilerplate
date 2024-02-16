export abstract class ICacheService {
    /**
     * Lưu dữ liệu vào cache
     * @param key Tên của dữ liệu
     * @param value Giá trị của dữ liệu
     * @param expired Thời gian hết hạn (giây)
     * @return Promise<'OK'>
     * @example this.redisService.set('foo', 'bar', 60);
     */
    abstract set(key: string, value: string, expired: string | number): Promise<'OK'>
    /**
     * Lưu dữ liệu vào cache (nhưng không bao giờ hết hạn)
     * @param key Tên của dữ liệu
     * @param value Giá trị của dữ liệu
     * @return Promise<number>
     * @example this.redisService.setNx('foo', 'bar');
     */
	abstract setNx(key: string, value: string): Promise<number>
    /**
     * Lấy dữ liệu từ trong cache
     * @param key Tên của dữ liệu
     * @return Promise<string | null>
     * @example this.redisService.get('foo'); //'bar'
     */
	abstract get(key: string): Promise<string | null>
    /**
     * Xoá dữ liệu khỏi cache
     * @param key Tên của dữ liệu
     * @return Promise<number>
     * @example this.redisService.del('foo');
     */
	abstract del(key: string): Promise<number>
    /**
     * Lấy tất cả các key theo tiền tố của nó
     * @param prefix Tiền tố của key
     * @return Promise<string[]>
     * @example this.redisService.keys('foo');
     */
	abstract keys(prefix: string): Promise<string[]>
}