import { NotFoundException, Query } from "@nestjs/common";
import { Any, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{  //Repository base class allow us to do operations like findOne,cound,create . refer the link in resouces

async getTasks(filterDto : GetTaskFilterDto):Promise<Task[]>{
  const {status , search} = filterDto;
  const query = this.createQueryBuilder('task');//'task' will represent the entity within the query   //creates query builder to interact with (Task Tasble)

  if(status){
      query.andWhere('task.status = :status' ,{status});
      console.log("pass");
  }
  if(search){
    query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' ,{search:`%${search}%`});
  }
  const tasks = await query.getMany();
  return tasks;
}

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

}