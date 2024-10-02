import { User } from "src/user/entities/user.entity";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleTrackingHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "vehicleId",
    length: 36,
    nullable: false,
  })
  vehicleID: string;

  @Column({
    name: "transferredToUserId",
    length: 36,
    nullable: false,
  })
  transferredToUserID: string;

  @Column({
    name: "transferredFromUserId",
    length: 36,
    nullable: true,
  })
  transferredFromUserID: string;

  @Column({
    type: "datetime",
    default: () => "NOW()",
    nullable: false,
  })
  transferredOn: string;

  @ManyToOne(() => User, user => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  transferredToUser: User;

  @ManyToOne(() => User, user => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  transferredFromUser: User;

  @ManyToOne(() => Vehicle, vehicle => vehicle.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  vehicle: Vehicle;
}
