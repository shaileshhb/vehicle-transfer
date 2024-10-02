import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column({
    name: "firstName",
    length: 100,
  })
  firstName: string;
  
  @Column({
    name: "lastName",
    length: 100,
  })
  lastName: string;
  
  @Column({
    name: "email",
    unique: true,
    length: 255,
  })
  email: string;
  
  @Column({
    name: "password",
    length: 255,
  })
  password: string;
  
}
