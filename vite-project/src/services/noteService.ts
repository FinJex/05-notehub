import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async ( searchText: string, page: number ): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async ( note: Omit<Note, "id"> ): Promise<Note> => {
    const response = await axios.post<Note>("/notes", note, {
            headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
    });
    return response.data;
}

export const deleteNote = async ( id: number): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`, {
                    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
    }); 
    return response.data;
}