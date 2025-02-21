import { ChangeEvent } from "react";

export default function Search({ onChange, searchTerm, ...props }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void, searchTerm: string, [key: string]: any }) {
    return <div className="bg-white shadow-md rounded-lg" {...props}>
        <label className="block text-sm font-medium text-gray-700">
            Search
        </label>
        <div className="flex items-center gap-2 mt-2">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={onChange}
            placeholder="Search by name, city, degree, specialty..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
    </div>
}