import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) { }

  async create(vehicleDto: CreateVehicleDto) {
    // check if vehicle already exists
    const existingVehicle = await this.vehicleRepository.findOneBy({ vehicleNumber: vehicleDto.vehicleNumber });
    if (existingVehicle) {
      throw new BadRequestException('Vehicle number already exists.');
    }

    const vehicle = await this.vehicleRepository.save(vehicleDto)
    return { id: vehicle.id };
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    return vehicle
  }

  update(id: string, vehicleDto: UpdateVehicleDto) {
    return this.vehicleRepository.update(id, vehicleDto);
  }

  async delete(id: string) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    await this.vehicleRepository.delete({ id })
    return { id }
  }
}
