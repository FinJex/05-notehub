import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";


export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
const { data, isLoading, isError} = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes("", currentPage),
});
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading notes</p>;
  }


    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{data && data.totalPages > 1 && (<Pagination totalPages={data.totalPages} page={currentPage} setPage={setCurrentPage} />)}
        {<button type="button" className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>}
        {isModalOpen && (<Modal onClose={() => setIsModalOpen(false)}> <NoteForm onClose={() => setIsModalOpen(false)} /> </Modal>)}
  </header>
 {data && data.notes.length > 0 && ( <NoteList notes={data.notes} />)}
</div>
    );
} 