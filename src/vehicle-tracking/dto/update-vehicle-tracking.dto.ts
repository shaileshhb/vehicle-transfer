import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleTrackingDto } from './create-vehicle-tracking.dto';

export class UpdateVehicleTrackingDto extends PartialType(CreateVehicleTrackingDto) {}
