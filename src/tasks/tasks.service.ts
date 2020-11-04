import { Injectable } from '@nestjs/common';
import { Task,TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { response } from 'express';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks : Task[] = [];

  getAllTasks() : Task[] {
    return this.tasks;
  }

  getTaskById(id : string):Task{ 

    return this.tasks.find(task => task.id === id)
  }

  getTasksWithFilters(filterDto : GetTaskFilterDto) :Task[]{
    const {status , search} = filterDto;
    let tasks = this.getAllTasks();

    if(status){
      tasks = tasks.filter(task => task.status === status);
    }
    if(search){
      tasks = tasks.filter(task =>
         task.title.includes(search) ||
         task.description.includes(search),
         );
    }
    return tasks;
  }

  deleteTask(id : string) :void{

    let taskDel = this.tasks.findIndex(task => task.id === id);    
    this.tasks.splice(taskDel , 1);
    console.log(taskDel);
    
  }
  
  createTasks(createTaskDto : CreateTaskDto):Task {   //this is a single task
  const {title, description} = createTaskDto;  //destruct the Dto object using ES6
    const task : Task = {
      id : uuidv4(),
      title,
      description,
      status : TaskStatus.OPEN, // Default value OPEN        
    }; 

   this.tasks.push(task);   // push to array we created
   return task ; //return the newly created resources
  }

  updateTaskStatus(id : string , status : TaskStatus):Task {   //this is a single task
   const task = this.getTaskById(id);
    task.status = status;
     return task ; 
    }
  
  
}
