import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Init1705553976784 } from 'src/modules/database/migrations/1700640721576-init';
import { CreateAdmin1700640721577 } from 'src/modules/database/migrations/1700640721577-create_admin';
import { Subscription1701083549807 } from 'src/modules/database/migrations/1701083549807-subscription';
import { AddColumnPlayerTurn1701324127981 } from 'src/modules/database/migrations/1701324127981-addColumnPlayerTurn';
import { Application1701330558474 } from 'src/modules/database/migrations/1701330558474-application';
import { Merchant1701399764477 } from 'src/modules/database/migrations/1701399764477-merchant';
import { Merchant1701415924626 } from 'src/modules/database/migrations/1701415924626-merchant';
import { Merchant1701416098139 } from 'src/modules/database/migrations/1701416098139-merchant';
import { Application1701417299445 } from 'src/modules/database/migrations/1701417299445-application';
import { SubscriptionQr1701422000214 } from 'src/modules/database/migrations/1701422000214-subscription_qr';
import { SubscriptionQr1701484500151 } from 'src/modules/database/migrations/1701484500151-subscription_qr';
import { Subscription1701836595909 } from 'src/modules/database/migrations/1701836595909-subscription';
import { UpdateMerchantEndSubscriptionDate1701850096157 } from 'src/modules/database/migrations/1701850096157-update_merchant_end_subscription_date';
import { SubscriptionQr1701915938166 } from 'src/modules/database/migrations/1701915938166-subscription_qr';
import { UpdateMinigameType1702008632783 } from 'src/modules/database/migrations/1702008632783-update_minigame_type';
import { Application1702022429350 } from 'src/modules/database/migrations/1702022429350-application';
import { PaymentLog1702436948748 } from 'src/modules/database/migrations/1702436948748-payment_log';
import { Subscription1702438904039 } from 'src/modules/database/migrations/1702438904039-subscription';
import { Minigame1703217752872 } from 'src/modules/database/migrations/1703217752872-minigame';
import { IndexPlayerPlayGameLog1703219245636 } from 'src/modules/database/migrations/1703219245636-index-player-play-game-log';
import { UpdateManychatSetting1704881362054 } from 'src/modules/database/migrations/1704881362054-update-manychatSetting';
import { AddColumnNameFacebookForRawPsid1704966492028 } from 'src/modules/database/migrations/1704966492028-add-column-name-facebook-for-raw-psid';
import { UpdateMerchant1705568442647 } from 'src/modules/database/migrations/1705568442647-update-merchant';
import { UpdateMerchant1706077627321 } from 'src/modules/database/migrations/1706077627321-update-merchant';
import { UpdateMerchant1706079385360 } from 'src/modules/database/migrations/1706079385360-update-merchant';
import { PlayerPlayGameLog1706091711334 } from 'src/modules/database/migrations/1706091711334-player-play-game-log';
import { PaymentLog1706168852460 } from 'src/modules/database/migrations/1706168852460-payment_log';
import { PaymentLog1706172327266 } from 'src/modules/database/migrations/1706172327266-payment_log';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	database: configService.get<string>('DB_NAME'),
	schema: configService.get<string>('DB_SCHEMA'),
	entities: ['**/*.entity.js'],
	migrationsTableName: `migrations`,
	migrations: [
		Init1705553976784,
		CreateAdmin1700640721577,
		Subscription1701083549807,
		AddColumnPlayerTurn1701324127981,
		Application1701330558474,
		Merchant1701399764477,
		Merchant1701415924626,
		Merchant1701416098139,
		Application1701417299445,
		SubscriptionQr1701422000214,
		SubscriptionQr1701484500151,
		Subscription1701836595909,
		UpdateMerchantEndSubscriptionDate1701850096157,
		SubscriptionQr1701915938166,
		UpdateMinigameType1702008632783,
		Application1702022429350,
		PaymentLog1702436948748,
		Subscription1702438904039,
		Minigame1703217752872,
		IndexPlayerPlayGameLog1703219245636,
		UpdateManychatSetting1704881362054,
		AddColumnNameFacebookForRawPsid1704966492028,
		UpdateMerchant1705568442647,
		UpdateMerchant1706077627321,
		UpdateMerchant1706079385360,
		PlayerPlayGameLog1706091711334,
		PaymentLog1706168852460,
		PaymentLog1706172327266
	],
	synchronize: false
});
