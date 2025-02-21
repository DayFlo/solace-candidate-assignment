"use client";

import { useEffect, useState, ChangeEvent } from "react";

import Search from '@components/search';
import AdvocateTable from '@components/advocateTable';

// Adding a debounce function for the search because the click version was pretty bad
function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [page, setPage] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm)
  useEffect(() => {
    console.log("fetching advocates...");

    // Merp! adding a catch for this
    const apiCall = async () => { 
      try {
        const response = await fetch("/api/advocates?" + new URLSearchParams({ page: page.toString(), search: searchTerm }).toString())
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { error, data } = await response.json();

        console.log(error)
        if (error) {
          throw new Error(error);
        }
        setFilteredAdvocates(data);
      } catch (error) {
        console.error(error);
        setFilteredAdvocates([]);
      }
    }

    apiCall();
  }, [debouncedSearchTerm, page]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);
  };

  const handleChangePage = (n: number) => {
    setPage(page + n);
  }

  return (
    <main className="container p-6">
      <h1 className="flex justify-center text-2xl font-bold text-gray-900 mb-6">Solace Advocates</h1>
      <Search onChange={handleOnChange} searchTerm={searchTerm} className="mb-6" />
      <AdvocateTable filteredAdvocates={filteredAdvocates} currentPage={page} handleChangePage={handleChangePage} />
    </main>
  );
}
