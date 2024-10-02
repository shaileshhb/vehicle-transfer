import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({
    name: "vehicle_number",
  })
  vehicleNumber: string;

  @Column({
    name: "vehicle_type",
  })
  vehicleType: string;

  @Column({
    name: "puc_certificate",
    nullable: true,
  })
  pucCertificate: string;

  @Column({
    name: "insurance_certificate",
    nullable: true,
  })
  insuranceCertificate: string;
}
