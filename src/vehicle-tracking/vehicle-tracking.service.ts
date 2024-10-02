import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleTrackingDto } from './dto/create-vehicle-tracking.dto';
import { UpdateVehicleTrackingDto } from './dto/update-vehicle-tracking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTracking } from './entities/vehicle-tracking.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { VehicleTrackingHistory } from './entities/vehicle-tracking-history.entity';

@Injectable()
export class VehicleTrackingService {
  constructor(
    @InjectRepository(VehicleTracking)
    private readonly trackingRepository: Repository<VehicleTracking>,

    @InjectRepository(VehicleTrackingHistory)
    private readonly historyRepository: Repository<VehicleTrackingHistory>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) { }
  async create(vehicleTrackingDto: CreateVehicleTrackingDto) {
    // check if user exist
    await this.doesUserExist(vehicleTrackingDto.userID)

    // check if vehicle exists
    await this.doesVehicleExist(vehicleTrackingDto.vehicleID)

    // check if vehicle is added to vehicle tracking.
    const tracking = await this.trackingRepository.findOneBy({ vehicleID: vehicleTrackingDto.vehicleID })

    if (tracking) {
      await this.trackingRepository.update({ vehicleID: vehicleTrackingDto.vehicleID }, {
        userID: vehicleTrackingDto.userID,
      })

      await this.historyRepository.save({
        vehicleID: vehicleTrackingDto.vehicleID,
        transferredToUserID: vehicleTrackingDto.userID,
        transferredFromUserID: tracking.userID,
      })

      return { id: tracking.id };
    }

    // const newTracking = this.trackingRepository.create(vehicleTrackingDto)
    const vehicleTracking = await this.trackingRepository.save(vehicleTrackingDto)
    
    await this.historyRepository.save({
      vehicleID: vehicleTrackingDto.vehicleID,
      transferredToUserID: vehicleTrackingDto.userID,
    })

    return { id: vehicleTracking.id };
  }

  async findOne(vehicleID: string) {
    const tracking = await this.trackingRepository.findOneBy({ vehicleID: vehicleID })

    if (!tracking) {
      throw new BadRequestException("Vehicle does not exist")
    }

    return tracking;
  }

  // doesUserExist will check if user exists else throws bad request exception
  async doesUserExist(userID: string) {
    const user = this.userRepository.findOneBy({ id: userID })
    if (!user) {
      throw new BadRequestException("User does not exist")
    }
  }

  // doesVehicleExist will check if vehicle exists else throws bad request exception
  async doesVehicleExist(vehicleID: string) {
    const user = this.vehicleRepository.findOneBy({ id: vehicleID })
    if (!user) {
      throw new BadRequestException("Vehicle does not exist")
    }
  }

  // findAll() {
  //   return `This action returns all vehicleTracking`;
  // }

  // update(id: number, updateVehicleTrackingDto: UpdateVehicleTrackingDto) {
  //   return `This action updates a #${id} vehicleTracking`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vehicleTracking`;
  // }
}
