import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({

  imports : [
    TypeOrmModule.forFeature([TaskRepository]) //indipendacy injection to typeorm module to our task repository
  ],

  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
