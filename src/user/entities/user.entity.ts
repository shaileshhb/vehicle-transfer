import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    length: 100,
  })
  firstName: string;
  
  @Column({
    length: 100,
  })
  lastName: string;
  
  @Column({
    unique: true,
    length: 255,
  })
  email: string;
  
  @Column({
    length: 50,
  })
  password: string;
  
}
