import { IsAlpha, IsAlphanumeric, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  vehicleNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  vehicleType: string;

  @IsEmpty()
  pucCertificate: string

  @IsEmpty()
  insuranceCertificate: string
}
