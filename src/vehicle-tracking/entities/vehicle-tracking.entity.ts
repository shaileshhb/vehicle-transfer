import { User } from "src/user/entities/user.entity";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleTracking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "userId",
    length: 36,
    nullable: false,
  })
  userID: string;

  @Column({
    name: "vehicleId",
    length: 36,
    nullable: false,
  })
  vehicleID: string;

  @ManyToOne(() => User, user => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',

  })
  user: User;

  @ManyToOne(() => Vehicle, vehicle => vehicle.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  vehicle: Vehicle;
}
