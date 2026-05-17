import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
ReactPaginateModule as unknown as ModuleWithDefault<
ComponentType<ReactPaginateProps>
>
).default;

interface PaginationProps {
totalPages: number;
page: number;
setPage: (selected: number) => void;
}

export default function Pagination({
totalPages,
page,
setPage,
}: PaginationProps) {
return (
<ReactPaginate
className={css.pagination}
breakLabel="..."
nextLabel=">"
previousLabel="<"
pageCount={totalPages}
forcePage={page - 1}
onPageChange={(e) => setPage(e.selected + 1)}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
activeClassName={css.active}
/>
);
}