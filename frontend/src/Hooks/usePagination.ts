import { useState, useMemo } from "react";

export interface UsePaginationResult<T> {
  currentData: T[];
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPage: (page: number) => void;
}

const usePagination = <T,>(data: T[], itemsPerPage: number): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const currentData = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return data.slice(indexOfFirst, indexOfLast);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return { currentData, currentPage, totalPages, nextPage, prevPage, setCurrentPage };
};

export default usePagination;