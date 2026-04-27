import { getNote } from "../actions"
import { NoteEditor } from "@/components/NoteEditor"
import { notFound } from "next/navigation"

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  let note

  try {
    note = await getNote(params.id)
  } catch {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Note</h1>
        <p className="text-gray-400 mt-1">Make changes to your note</p>
      </div>

      <div className="h-[calc(100vh-12rem)]">
        <NoteEditor note={note} />
      </div>
    </div>
  )
}
