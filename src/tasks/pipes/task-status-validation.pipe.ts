import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";



export class TaskStatusValidationPipe implements PipeTransform {
readonly allowedStateuses = [
  TaskStatus.OPEN,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
  
];


  transform(value: any){
    value = value.toUpperCase();    
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`"${value}" is not a valid status`);
    }
    return value ;
  }
private isStatusValid(status : any){
let inx = this.allowedStateuses.indexOf(status); //index provides -1 if there no any matching one
return inx !== -1 ; 
}


}