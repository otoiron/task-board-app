

import { useState } from "react";
import { Task, TaskStatus } from "@/types/task";

type Props = {
  onSubmit: (task: {
    title: string;
    body: string;
    due: string;
    assignee: string;
    status: TaskStatus;
  }) => void;
  onCancel: () => void;
  initialValues?: Partial<Task>;
};

export const AddTaskForm = ({ onSubmit, onCancel, initialValues }: Props) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [body, setBody] = useState(initialValues?.body ?? "");
  const [due, setDue] = useState(
    initialValues?.due ?? new Date().toISOString().split("T")[0]
  );
  const [assignee, setAssignee] = useState(initialValues?.assignee ?? "");
  const [status] = useState<TaskStatus>(initialValues?.status ?? "todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, body, due, assignee, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">本文</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">期限</label>
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">担当</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialValues ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
};
