"use client";

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTasks } from "@/hooks/useTasks";
import { Column } from "@/components/Organisms/Column";
import type { TaskStatus } from "@/types/task";

export const TaskBoard = () => {
  const { tasks, loading, error, dispatch } = useTasks();

  const isTaskStatus = (value: unknown): value is TaskStatus => {
    return value === "todo" || value === "doing" || value === "done";
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    if (!isTaskStatus(destination.droppableId)) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        taskId: draggableId,
        destinationStatus: destination.droppableId,
        destinationIndex: destination.index,
      },
    });
  }

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  if (error) {
    return (
      <p className="p-4 text-red-500">エラーが発生しました: {error.message}</p>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 flex-wrap p-8">
        <Column title="Todo" tasks={todoTasks} isLoading={loading} />
        <Column title="Doing" tasks={doingTasks} isLoading={loading} />
        <Column title="Done" tasks={doneTasks} isLoading={loading} />
      </div>
    </DragDropContext>
  );
}