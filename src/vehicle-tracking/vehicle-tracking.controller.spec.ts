import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTrackingController } from './vehicle-tracking.controller';
import { VehicleTrackingService } from './vehicle-tracking.service';

describe('VehicleTrackingController', () => {
  let controller: VehicleTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleTrackingController],
      providers: [VehicleTrackingService],
    }).compile();

    controller = module.get<VehicleTrackingController>(VehicleTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
