import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";


export class TaskStatusValidationPipe implements PipeTransform {
readonly allowedStatuses = [
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
const inx = this.allowedStatuses.indexOf(status); //index provides -1 if there no any matching one
return inx !== -1 ; 
}


}