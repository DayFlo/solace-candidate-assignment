"use client";

import { useEffect, useState, ChangeEvent } from "react";

import Search from '@components/search';
import AdvocateTable from '@components/advocateTable';

// Adding a debounce function for the search because the click version was pretty bad
function useDebounce(value: string, delay = 100) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [page, setPage] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm)
  useEffect(() => {
    console.log("fetching advocates...");

    // Merp! adding a catch for this
    const apiCall = async () => { 
      try {
        await fetch("/api/advocates?" + new URLSearchParams({ page: page.toString() }).toString())
          .then((response) => {
            response.json().then((jsonResponse) => {
              setAdvocates(jsonResponse.data);
              setFilteredAdvocates(jsonResponse.data);
            });
          });
      } catch (error) {
        console.error(error);
      }
    }

    apiCall();
  }, [debouncedSearchTerm, page]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
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
