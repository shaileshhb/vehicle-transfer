import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column({
    name: "first_name",
    length: 100,
  })
  firstName: string;
  
  @Column({
    name: "last_name",
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
