import { Task } from "@/types/task";
import { TaskCard } from "@/components/Molecules/TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Organisms/Modal";
import { AddTaskForm } from "@/components/Organisms/AddTaskForm";
import type { Action } from "@/types/task";

type Props = {
  title: string;
  tasks?: Task[];
  isLoading?: boolean;
  dispatch: React.Dispatch<Action>;
};

export const Column = ({ title, tasks = [], isLoading = false, dispatch }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Droppable droppableId={title.toLowerCase()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <TaskCard key={i} isLoading dispatch={dispatch} />
              ))
            ) : tasks.length === 0 ? (
              <p className="text-sm text-gray-500">タスクはありません</p>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  dispatch={dispatch}
                />
              ))
            )}
            {provided.placeholder}
            {title === "Todo" && (
              <div className="mt-4">
                <Button
                  label="新しいタスクを追加"
                  onClick={() => setIsModalOpen(true)}
                />
                {isModalOpen && (
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    <AddTaskForm
                      onSubmit={(task) => {
                        dispatch({
                          type: "ADD_TASK",
                          payload: {
                            id: crypto.randomUUID(),
                            ...task,
                          },
                        });
                        setIsModalOpen(false);
                      }}
                      onCancel={() => setIsModalOpen(false)}
                    />
                  </Modal>
                )}
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};