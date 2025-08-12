"use client";
import { useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { Draggable } from "@hello-pangea/dnd";
import { Modal } from "@/components/Organisms/Modal";
import { AddTaskForm } from "@/components/Organisms/AddTaskForm";

type Props = {
  task?: Task;
  isLoading?: boolean;
  index?: number;
};

export const TaskCard = ({ task, isLoading = false, index }: Props) => {
  const { dispatch } = useTasks();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading)
    return (
      <div className="bg-gray-200 animate-pulse rounded p-4 mb-4 h-[120px]" />
    );

  if (!task || index === undefined) return null;

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: { taskId: task.id } });
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="bg-white rounded shadow p-4 mb-4 border border-gray-200 relative">
              <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{task.body}</p>
              <div className="text-xs text-gray-500 flex gap-2">
                <span>期限: {task.due}</span>
                <span>担当: {task.assignee}</span>
                <button
                  onClick={() => setIsConfirmOpen(true)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  削除
                </button>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  編集
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <div className="space-y-4">
          <p>このタスクを削除してもよろしいですか？</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              キャンセル
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              削除する
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <AddTaskForm
          initialValues={task}
          onSubmit={(updated) => {
            dispatch({
              type: "UPDATE_TASK",
              payload: { ...task, ...updated },
            });
            setIsEditOpen(false);
          }}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>
    </>
  );
};