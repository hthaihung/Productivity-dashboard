import { TaskForm } from "@/components/TaskForm"

export default function NewTaskPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">New Task</h1>
        <p className="text-gray-400 mt-1">Create a new task</p>
      </div>

      <TaskForm />
    </div>
  )
}
