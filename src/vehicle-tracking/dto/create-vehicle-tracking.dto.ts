import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateVehicleTrackingDto {
  @IsUUID()
  @IsNotEmpty()
  userID: string;
  
  vehicleID: string;
}
