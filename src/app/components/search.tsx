export default function Search ({ onChange, onClick }: { onChange: any, onClick: () => void }) {
    return <>
        <p>Search</p>
        <p>
        Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
    </>
}