import { IsAlpha, IsAlphanumeric, IsEmpty, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  vehicleNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  vehicleType: string;

  @IsEmpty()
  @IsUrl()
  pucCertificate: string

  @IsEmpty()
  @IsUrl()
  insuranceCertificate: string
}
