import { Task } from "@/types/task";

export async function loadTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました");
  }
  return response.json();
}
