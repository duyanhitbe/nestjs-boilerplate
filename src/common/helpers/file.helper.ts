import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export class FileHelper {
	static walkSyncFiles(dir: string, listFiles: string[] = []) {
		const files = readdirSync(dir);
		files.forEach(function (file: any) {
			if (statSync(join(dir, file)).isDirectory()) {
				listFiles = FileHelper.walkSyncFiles(join(dir, file), listFiles);
			} else {
				listFiles.push(join(dir, file));
			}
		});
		return listFiles;
	}
}
