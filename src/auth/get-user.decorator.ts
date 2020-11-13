import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

//this is a in build decorator
export const GetUser = createParamDecorator((data: unknown, currentUser :ExecutionContext):User =>{
  const request = currentUser.switchToHttp().getRequest();
 // console.log(request.user);
  return request.user;
});



 