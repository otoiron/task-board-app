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

export type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Task[] }
  | { type: "LOAD_ERROR"; payload: Error }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: { taskId: string } } // payload is task id
  | {
      type: "MOVE_TASK";
      payload: {
        taskId: string;
        destinationStatus: TaskStatus;
        destinationIndex: number;
      };
    };