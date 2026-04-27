"use client"

import { useState } from "react"
import { createNote, updateNote, deleteNote } from "@/app/dashboard/notes/actions"
import { useRouter } from "next/navigation"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface NoteEditorProps {
  note?: Note
  onClose?: () => void
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      if (note) {
        await updateNote(note.id, { title, content })
      } else {
        await createNote({ title, content })
      }
      router.refresh()
      if (onClose) onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save note")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!note) return
    if (!confirm("Delete this note?")) return

    setIsSaving(true)
    try {
      await deleteNote(note.id)
      router.push("/dashboard/notes")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note")
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface-1 border border-gray-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          aria-label="Note title"
          className="flex-1 text-xl font-semibold bg-transparent text-white placeholder-gray-500 focus:outline-none"
          disabled={isSaving}
        />
        <div className="flex items-center gap-2">
          {note && (
            <button
              onClick={handleDelete}
              disabled={isSaving}
              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          aria-label="Note content"
          className="w-full h-full bg-transparent text-gray-300 placeholder-gray-600 resize-none focus:outline-none"
          disabled={isSaving}
        />
      </div>
    </div>
  )
}
