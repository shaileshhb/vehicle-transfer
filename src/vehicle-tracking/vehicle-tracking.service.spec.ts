import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTrackingService } from './vehicle-tracking.service';

describe('VehicleTrackingService', () => {
  let service: VehicleTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleTrackingService],
    }).compile();

    service = module.get<VehicleTrackingService>(VehicleTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
