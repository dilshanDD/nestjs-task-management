import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

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

  @OneToMany(type => Task, task => task.user,{ eager : true})
  tasks: Task[];
//Eager : true means when ever we retrieve user we can access user.tasks immediately and get tasks own by the same user , so one side of the relationship can be eager true


  async validatePassword(password : string):Promise<boolean>{ //taking the password from request body
    const hash = await bcrypt.hash(password , this.salt);
    return hash === this.password;
  }

}