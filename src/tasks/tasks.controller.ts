import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService:TasksService){ }//service injected to the controller
    
    @Get()
    getTasks(@Query(ValidationPipe) filterDto : GetTaskFilterDto): Task[]{
      if(Object.keys(filterDto).length) {    //find if any fiteres provided in query 
      return this.taskService.getTasksWithFilters(filterDto);   
      }
      else
      {
        return this.taskService.getAllTasks();
      }      
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string){
      return this.taskService.getTaskById(id);
    }
    // @Post()
    // createTask(@Body() body){   //When the post request is made @Body will receive all parameters in the body
    //   console.log(body);
    // }

    // @Post() 
    // createTask(
    //   @Body('tittle')tittle : string,
    //   @Body('description')description : string   // without using this way @Body we can use Dto
    // ) :Task{
    //  return this.taskService.createTasks(tittle, description);
    // } 
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto) :Task
    {
      return this.taskService.createTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string):void
    {
      this.taskService.deleteTask(id);

    }
    @Patch('/:id/status')
    updateTaskStatus(
     @Param('id') id : string,
      @Body('status',TaskStatusValidationPipe) status : TaskStatus
    ) :Task
    {
      return this.taskService.updateTaskStatus(id,status);
    }
   
}
