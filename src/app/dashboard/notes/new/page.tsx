import { NoteEditor } from "@/components/NoteEditor"

export default function NewNotePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">New Note</h1>
        <p className="text-gray-400 mt-1">Create a new note</p>
      </div>

      <div className="h-[calc(100vh-12rem)]">
        <NoteEditor />
      </div>
    </div>
  )
}
