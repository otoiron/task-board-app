"use client";
import { useEffect, useReducer } from "react";
import { Task, Action } from "@/types/task";

type State = {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
};

const initialState: State = {
  tasks: [],
  loading: true,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };
    case "LOAD_SUCCESS":
      return {
        tasks: action.payload.map((task, index) => ({
          ...task,
          index,
        })),
        loading: false,
        error: null,
      };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TASK": {
      const newTask = action.payload;
      const sameColumnTasks = state.tasks.filter(task => task.status === newTask.status);
      const maxIndex = sameColumnTasks.length;

      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...newTask,
            index: maxIndex,
          },
        ],
      };
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.taskId),
      };
    }
    case "MOVE_TASK": {
      const { taskId, destinationStatus, destinationIndex } = action.payload;
      const targetTask = state.tasks.find((task) => task.id === taskId);
      if (!targetTask) return state;

      // Remove task
      const remainingTasks = state.tasks.filter((task) => task.id !== taskId);

      // Build new column with updated task
      const updatedTask = { ...targetTask, status: destinationStatus };

      const before = remainingTasks.filter(
        (task) => task.status === destinationStatus
      );

      before.splice(destinationIndex, 0, updatedTask);

      const updatedColumn = before.map((task, idx) => ({
        ...task,
        index: idx,
      }));

      const others = remainingTasks.filter(
        (task) => task.status !== destinationStatus
      );

      return {
        ...state,
        tasks: [...updatedColumn, ...others],
      };
    }
    default:
      return state;
  }
}

export const useTasks = (): State & { dispatch: React.Dispatch<Action> } => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("状態が更新されました:", state);
  }, [state]);

  useEffect(() => {
    if (!state.loading && !state.error) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.error, state.loading]);

  useEffect(() => {
    dispatch({ type: "LOAD_START" });
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "LOAD_SUCCESS", payload: parsed });
      } else {
        dispatch({ type: "LOAD_SUCCESS", payload: [] });
      }
    } catch (error) {
      console.error("localStorage 読み込み失敗:", error);
      dispatch({ type: "LOAD_ERROR", payload: error as Error });
    }
  }, []);

  return { ...state, dispatch };
}
