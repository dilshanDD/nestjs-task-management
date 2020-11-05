import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

async createTask(createTaskDto : CreateTaskDto):Promise<Task>{
  // same shape of data guratee for us by using createTaskDto (Typescript) without just using parameter value
  const {title,description} = createTaskDto;

  const task = new Task();
  task.title = title;
  task.description = description;
  task.status = TaskStatus.OPEN;
  await task.save();
  return task;  
}

async getTaskById(id : number) : Promise<Task>{
  const found = await Task.findOne(id);
  if(!found){
  throw new NotFoundException(`Task with id "${id}" not found` );
  }
  return found;
}


}