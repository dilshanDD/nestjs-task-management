import { IsNotEmpty, IsEmail, IsEmpty, IsOptional, IsIn } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    title : string;

    //@IsNotEmpty()
    @IsEmail()
    description : string;

}