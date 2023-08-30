import { Note } from "./Note";

export type NoteContextType = {
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
};

export type HandleAddOrEditNoteType = NoteContextType["addOrEditNote"]
export type HandleDeleteNoteType = NoteContextType["deleteNote"]