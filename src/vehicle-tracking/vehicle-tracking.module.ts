import { Module } from '@nestjs/common';
import { VehicleTrackingService } from './vehicle-tracking.service';
import { VehicleTrackingController } from './vehicle-tracking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTracking } from './entities/vehicle-tracking.entity';
import { VehicleTrackingHistory } from './entities/vehicle-tracking-history.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleTracking,
      VehicleTrackingHistory,
      User,
      Vehicle,
    ]),
    UserModule,
    VehicleModule
  ],
  controllers: [VehicleTrackingController],
  providers: [VehicleTrackingService, UserService, VehicleService],
})
export class VehicleTrackingModule { }
