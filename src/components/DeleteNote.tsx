"use client"
import Dialog from "./Dialog";
import { useNoteContext } from "@/context/NoteContext";

export default function DeleteNote() {
    const { deleteNote, handleDeleteNote, removeNote } = useNoteContext();

    return (
        deleteNote.open && (
            <Dialog className="md:w-[32%]">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Delete Note
                    </h2>
                    <p className="text-gray-500">
                        Are you sure you want to delete this note? This action cannot be undone.
                    </p>
                    <div className="flex gap-1 mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500"
                            onClick={() => {
                                removeNote(deleteNote.noteId);
                                handleDeleteNote({ open: false, noteId: "" });
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100"
                            onClick={() => handleDeleteNote({ open: false, noteId: "" })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Dialog>
        )
    );
}
