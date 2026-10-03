export const NOTE_TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const;
export type NoteTag = typeof NOTE_TAGS[number];
export type NoteSortBy = 'created' | 'updated' | null;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
