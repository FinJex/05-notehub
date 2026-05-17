import css from "./NoteList.module.css"
import type { Note } from "../types/note";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../services/noteService";
interface NoteListProps {
  notes: Note[];
}


export default function NoteList({notes}: NoteListProps) {
  const queryClient = useQueryClient();
const handleDelete = async (id: number) => {
  try {
    await deleteNote(id);

    queryClient.invalidateQueries({
      queryKey: ["notes"],
    });
  } catch (error) {
    console.log("Error deleting note:", error);
  }
};
    return (
<ul className={css.list}>
	 {notes.map((note) => (
  <li  key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button className={css.button} onClick={() => handleDelete(note.id)}>Delete</button>
    </div>
  </li>
  ))}
</ul>
    );
}