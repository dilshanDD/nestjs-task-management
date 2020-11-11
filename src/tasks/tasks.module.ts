import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({

  imports : [
    TypeOrmModule.forFeature([TaskRepository]), //indipendacy injection to typeorm module to our task repository
    AuthModule
  ],

  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
