export interface ITaskDto {
  id: string;
  title: string;
  description: string | null;
  isDone: boolean;
  accountId: string;
}

export class Task implements ITaskDto {
  id: string;
  title: string;
  description: string | null;
  isDone: boolean;
  accountId: string;
}
