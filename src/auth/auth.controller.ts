import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto.ts/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService : AuthService
  ){}

  @Post('/signup')
  signUp(@Body(ValidationPipe)authCredentialsDto:AuthCredentialsDto):Promise<void>{
    
    return this.authService.signUp(authCredentialsDto);
  }
}