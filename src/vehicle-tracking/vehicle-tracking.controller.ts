import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { VehicleTrackingService } from './vehicle-tracking.service';
import { CreateVehicleTrackingDto } from './dto/create-vehicle-tracking.dto';
import { UpdateVehicleTrackingDto } from './dto/update-vehicle-tracking.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('track/vehicle')
@UseGuards(AuthGuard)
export class VehicleTrackingController {
  constructor(private readonly vehicleTrackingService: VehicleTrackingService) { }

  @Post(":vehicleID")
  create(@Param('vehicleID') vehicleID: string, @Body(ValidationPipe) vehicleTrackingDto: CreateVehicleTrackingDto) {
    vehicleTrackingDto.vehicleID = vehicleID;
    return this.vehicleTrackingService.create(vehicleTrackingDto);
  }

  @Get(':vehicleID')
  findOne(@Param('vehicleID') vehicleID: string) {
    return this.vehicleTrackingService.findOne(vehicleID);
  }

  // @Get()
  // findAll() {
  //   return this.vehicleTrackingService.findAll();
  // }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleTrackingDto: UpdateVehicleTrackingDto) {
  //   return this.vehicleTrackingService.update(+id, updateVehicleTrackingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vehicleTrackingService.remove(+id);
  // }
}
