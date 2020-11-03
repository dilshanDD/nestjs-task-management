import { TasksService } from "./tasks.service";

export interface Task {
  id : string;
  title : string;
  description : string;
  status : TaskStatus;
}

export enum TaskStatus{
OPEN = 'OPEN',
IN_PROGRESS = 'IN_PROGRUSS',
DONE = 'DONE'
}