import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../services/noteService";
import { useDebouncedCallback } from 'use-debounce';
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";


export default function App() {
    const [inputValue, setInputValue] = useState("");
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

const updateSearchQuery = useDebouncedCallback(
  (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  },
  300
);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setInputValue(value);

    updateSearchQuery(value);
  };

const { data, isLoading, isError} = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(search, currentPage),
    placeholderData: keepPreviousData,
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
		{<SearchBox value={inputValue} onChange={handleChange} />}
		{data && data.totalPages > 1 && (<Pagination totalPages={data.totalPages} page={currentPage} setPage={setCurrentPage} />)}
        {<button type="button" className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>}
        {isModalOpen && (<Modal onClose={() => setIsModalOpen(false)}> <NoteForm onClose={() => setIsModalOpen(false)} /> </Modal>)}
  </header>
 {data && data.notes.length > 0 && ( <NoteList notes={data.notes} />)}
</div>
    );
} 