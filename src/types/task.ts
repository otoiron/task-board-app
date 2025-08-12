export type TaskStatus = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  body: string;
  due: string;
  assignee: string;
  status: TaskStatus;
  index?: number;
};