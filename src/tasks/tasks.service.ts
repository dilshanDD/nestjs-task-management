import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
private logger = new Logger('TasksService');

constructor(
  @InjectRepository(TaskRepository)
  private taskRepository : TaskRepository
  ){}

  getTasks(filterDto : GetTaskFilterDto , 
    user : User
    ):Promise<Task[]>{
  return this.taskRepository.getTasks(filterDto , user);
  }
 async getTaskById(id : number, user: User) : Promise<Task>{
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id} });
    if(!found){
    throw new NotFoundException(`Task with id "${id}" not found` );
    }
    return found;
  }

  async createTask(createTaskDto  : CreateTaskDto ,
    user : User,
    ): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto , user);
  }

  async deleteTask(id : number, user : User) : Promise<void>{       
    const result = await this.taskRepository.delete({ id, userId: user.id}); // delete tasks belongs to the current user
    if(result.affected === 0){
      throw new NotFoundException(`Task with ID : "${id}" not found` );
    }  
   // console.log(result);
  }   

  async updateTaskStatus(id : number , status : TaskStatus , user : User):Promise<Task>{   //this is a single task
   let taskstate = await this.getTaskById(id, user);
   taskstate.status = status;
   await taskstate.save();    
    return ; 
  }

}
