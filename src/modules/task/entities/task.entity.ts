export interface ITaskDto {
  id: string;
  title: string;
  description: string | null;
  isDone: boolean;
  accountId: string;
}

export class Task implements ITaskDto {
  public id: string;
  public title: string;
  public description: string | null;
  public isDone: boolean;
  public accountId: string;

  constructor(props: ITaskDto) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.isDone = props.isDone;
    this.accountId = props.accountId;
  }

  public updateStatus() {
    this.isDone = !this.isDone;
  }
}
