import { NextResponse } from "next/server";
import { Task } from "@/types/task";
import tasks from "@/data/tasks.json";

export async function GET() {
  return NextResponse.json(tasks as Task[]);
}
