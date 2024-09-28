import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guard/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      envFilePath: join(
        __dirname,
        '../env/',
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MessageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
