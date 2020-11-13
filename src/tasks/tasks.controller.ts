import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(private taskService:TasksService){ }//service injected to the controller
  
  
  
  @Get()
  getTasks(@Query(ValidationPipe) filterDto : GetTaskFilterDto ,  
    @GetUser() user : User
  ) : Promise<Task[]>{  
    this.logger.verbose(`User ${user.username} retrieving all tasks.Filters: ${JSON.stringify(filterDto)}`); // filterDto object becomes json string
    return this.taskService.getTasks(filterDto , user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number,
    @GetUser() user : User,  // Autherized user
  ): Promise<Task>{
    return this.taskService.getTaskById(id , user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto : CreateTaskDto , 
    @GetUser() user : User, //get user who request
  ) :Promise<Task>{ 
    this.logger.verbose(`User "${user.username}"creating a task ${JSON.stringify(createTaskDto)} `);
    return this.taskService.createTask(createTaskDto,user);  // pass user to create task method of the service
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number ,
    @GetUser() user : User,
    ):Promise<void>{
   return this.taskService.deleteTask(id, user); 
  }

  @Patch('/:id/status')
  updateTaskStatus(
   @Param('id', ParseIntPipe) id : number,
    @Body('status',TaskStatusValidationPipe) status : TaskStatus,
    @GetUser() user : User
    ) :Promise<Task>
  {
    return this.taskService.updateTaskStatus(id,status,user);
  }
   
}
