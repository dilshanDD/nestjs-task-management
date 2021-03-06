import { InternalServerErrorException, Logger, NotFoundException, Query } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Any, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{  //Repository base class allow us to do operations like findOne,cound,create . refer the link in resouces

private logger = new Logger('TaskRepository');


async getTasks(filterDto : GetTaskFilterDto ,
   user : User
   ):Promise<Task[]>{    

  const {status , search} = filterDto;
  const query = this.createQueryBuilder('task');//'task' will represent the entity within the query   //creates query builder to interact with (Task Tasble)
    query.where('task.userId = :userId' , {userId : user.id});

  if(status){
      query.andWhere('task.status = :status' ,{status});
      console.log("pass"); 
  }
  if(search){
    query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' ,{search:`%${search}%`});
  }
  try {
    const tasks = await query.getMany();
    return tasks;
  } catch (error) {
    this.logger.error(`Failed to get tasks for user ${user.username}, Filters : ${JSON.stringify(filterDto)}`,error.stack);
    throw new InternalServerErrorException();
  }

 
}

async createTask(createTaskDto : CreateTaskDto , 
  user : User
  ):Promise<Task>{
  // same shape of data guratee for us by using createTaskDto (Typescript) without just using parameter value(gurateed same shape of data)
  const {title,description} = createTaskDto;

  const task = new Task();
  task.title = title;
  task.description = description;
  task.status = TaskStatus.OPEN;
  task.user = user;  //asigning this task into a user (1,2,3)

  try {
    await task.save();  
    await task.save();  
    delete task.user;  //task entity already been saved this delete for avoid return user data on the response
    return task;
  } catch (error) {
    this.logger.error(`Failed to create a task for the user : "${user.username}".Data : ${createTaskDto}`, error.stack);
    throw new InternalServerErrorException();
  }

  
}  
 
}   