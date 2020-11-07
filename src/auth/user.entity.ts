import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) //Providing colums to Unique will tagetting on columns that should not be same kind of data.this happens in database level not in API level.
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;


}