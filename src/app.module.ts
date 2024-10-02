import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTrackingModule } from './vehicle-tracking/vehicle-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        type: 'mysql',
        host: service.getOrThrow("DB_HOST"),
        port: service.getOrThrow("DB_PORT"),
        username: service.getOrThrow("DB_USERNAME"),
        password: service.getOrThrow("DB_PASSWORD"),
        database: service.getOrThrow("DB_NAME"),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    VehicleModule,
    VehicleTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: "user/register", method: RequestMethod.POST, },
      { path: "user/login", method: RequestMethod.POST, }
    )
    .forRoutes(
      { path: '*', method: RequestMethod.ALL }
    );
  }
}
