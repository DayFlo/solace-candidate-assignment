import { ChangeEvent } from "react";

export default function Search ({ onChange }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return <>
        <p>Search</p>
        <p>
        Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
    </>
}