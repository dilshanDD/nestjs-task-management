import { IsNotEmpty, IsEmail } from "class-validator";
export class CreateTaskDto{
    @IsNotEmpty()
    title : string;

    //@IsNotEmpty()
    @IsEmail()
    description : string;

}