import { useState } from "react";

export function usePagination<T=any>(itemsPerPage:number,totalItems:T[],currentPage:number){
    const [page,setPage] = useState(currentPage);

    const totalPages = Math.ceil(totalItems.length / itemsPerPage);

    const firstIndex = (page - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const visibleItems = totalItems.slice(firstIndex,lastIndex);

    return {visibleItems, page, totalPages,setPage};
}