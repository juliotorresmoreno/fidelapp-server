
import { Module } from '@nestjs/common';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { AwsSnsService } from './components/aws-sns/aws-sns.service';
import { AwsSnsModule } from './components/aws-sns/aws-sns.module';
import { SecureService } from './components/secure/secure.service';
import { SecureModule } from './components/secure/secure.module';
import { RedisModule } from './components/redis/redis.module';
import { AwsSesModule } from './components/aws-ses/aws-ses.module';
import { HbsRemplateModule } from './components/hbs-remplate/hbs-remplate.module';
import { QrCodeModule } from './resources/qr-code/qr-code.module';
import { ShopsModule } from './resources/shops/shops.module';
import { ProductsModule } from './resources/products/products.module';
import { UserShopsAccountsModule } from './resources/user_shops_accounts/user_shops_accounts.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        QrCodeModule,
        ShopsModule,
        AwsSnsModule,
        AwsSesModule,
        SecureModule,
        RedisModule,
        AwsSnsService,
        AwsSesModule,
        HbsRemplateModule,
        ProductsModule,
        UserShopsAccountsModule
    ],
    providers: [SecureService]
})
export class ApiModule { }
