import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto.ts/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ){}

 async signUp(authCredentialDto : AuthCredentialsDto) :Promise<void>{
    return this.userRepository.signUp(authCredentialDto);
  }
async signIn(authCredentialDto : AuthCredentialsDto){
 const username = await this.userRepository.validationUserPassword(authCredentialDto);
 
 if(!username){
  throw new UnauthorizedException('Invalid credentials');
 }
}

}
