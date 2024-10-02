import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({
    name: "vehicleNumber",
  })
  vehicleNumber: string;

  @Column({
    name: "vehicleType",
  })
  vehicleType: string;

  @Column({
    name: "pucCertificate",
    nullable: true,
  })
  pucCertificate: string;

  @Column({
    name: "insuranceCertificate",
    nullable: true,
  })
  insuranceCertificate: string;
}
