import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto.ts/auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User>{ 

  async signUp(authCredentials : AuthCredentialsDto) :Promise<void>{  
  //we can use two queries for findOne query and save also.but can handle preventing multiple username s in DB level.(user.entity) 
  const  {username , password} = authCredentials;

  const user = new User();
  user.username = username;
  user.salt = await bcrypt.genSalt();
  user.password = await this.hashPassword(password, user.salt);
  
  
  try{
    await user.save();
  }
  catch(error){
    if(error.code === '23505'){ 
      throw new ConflictException('Username already exist!');
    } else {
      throw new InternalServerErrorException();
    }
   }  
  }

  private async hashPassword(password: string , salt: string):Promise<string>{    
    return bcrypt.hash(password, salt);
  }
  
}