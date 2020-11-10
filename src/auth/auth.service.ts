import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayLoad } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto.ts/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ){}

 async signUp(authCredentialDto : AuthCredentialsDto) :Promise<void>{
    return this.userRepository.signUp(authCredentialDto);
  }
async signIn(authCredentialDto : AuthCredentialsDto):Promise<{accessToken : string}>{
 const username = await this.userRepository.validationUserPassword(authCredentialDto);
 
 if(!username){
  throw new UnauthorizedException('Invalid credentials');
 }
  
  const payload : JwtPayLoad = {username}; //also we can provide roles email address but not too sensitive data like passwords
  const accessToken = await this.jwtService.sign(payload); //creating the token

  return {accessToken};

}

}
