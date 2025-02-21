import React from "react";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

interface AdvocateTableProps {
  filteredAdvocates: Advocate[];
  currentPage: number;
  handleChangePage: (n: number) => void;
}

export default function AdvocateTable({ filteredAdvocates, currentPage, handleChangePage } : AdvocateTableProps) {
    return (
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className="text-left text-gray-700">
                    <th className="border border-gray-300 px-4 py-2">First Name</th>
                    <th className="border border-gray-300 px-4 py-2">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2">City</th>
                    <th className="border border-gray-300 px-4 py-2">Degree</th>
                    <th className="border border-gray-300 px-4 py-2">Specialties</th>
                    <th className="border border-gray-300 px-4 py-2">Years of Experience</th>
                    <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredAdvocates.length > 0 ? (
                    filteredAdvocates.map((advocate) => (
                        <tr key={advocate.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{advocate.firstName}</td>
                        <td className="border border-gray-300 px-4 py-2">{advocate.lastName}</td>
                        <td className="border border-gray-300 px-4 py-2">{advocate.city}</td>
                        <td className="border border-gray-300 px-4 py-2">{advocate.degree}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <ul className="list-disc list-inside">
                            {advocate.specialties.map((s, index) => (
                                <li key={index}>{s}</li>
                            ))}
                            </ul>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{advocate.yearsOfExperience}</td>
                        <td className="border border-gray-300 px-4 py-2">{advocate.phoneNumber}</td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={7} className="text-center text-gray-500 py-4">
                        No advocates found.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            {currentPage > 0 && <div className="flex justify-start mt-4">
                <button
                    onClick={() => handleChangePage(-1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Previous Page
                </button>
            </div>}

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => handleChangePage(1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};
