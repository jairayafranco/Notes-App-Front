import { Note } from "./Note";

export type NoteContextType = {
    notes: Note[];
    addOrEditNote: {
        open: boolean;
        note: Note | null;
    };
    handleAddOrEditNote: ({ open, note }: HandleAddOrEditNoteType) => void;
    deleteNote: {
        open: boolean;
        noteId: string;
    };
    handleDeleteNote: ({ open, noteId }: HandleDeleteNoteType) => void;
    addNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    removeNote: (noteId: string) => void;
};

export type HandleAddOrEditNoteType = NoteContextType["addOrEditNote"]
export type HandleDeleteNoteType = NoteContextType["deleteNote"]