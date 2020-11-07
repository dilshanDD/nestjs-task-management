import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {

constructor(
  @InjectRepository(TaskRepository)
  private taskRepository : TaskRepository
  ){}

  getTasks(filterDto : GetTaskFilterDto):Promise<Task[]>{
  return this.taskRepository.getTasks(filterDto);
  }
 async getTaskById(id : number) : Promise<Task>{
    const found = await this.taskRepository.findOne(id);
    if(!found){
    throw new NotFoundException(`Task with id "${id}" not found` );
    }
    return found;
  }

  async createTask(createTaskDto  : CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id : number) : Promise<void>{       
    const result = await this.taskRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Task with ID : "${id}" not found` );
    }  
    console.log(result);
  }  

  async updateTaskStatus(id : number , status : TaskStatus):Promise<Task>{   //this is a single task
    let taskstate = await this.getTaskById(id);
    taskstate.status = status;
    await taskstate.save();    
    return taskstate; 
  }

}
