import { Language } from '@common';
import { Module } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

@Module({
	imports: [
		I18nModule.forRoot({
			fallbackLanguage: Language.VI,
			loaderOptions: {
				path: join(__dirname, '/translations/'),
				watch: true
			},
			resolvers: [new HeaderResolver(['x-lang'])],
			typesOutputPath: join(
				__dirname,
				'/../../../../src/modules/i18n/generated/i18n.generated.ts'
			)
		})
	]
})
export class I18NModule {}
