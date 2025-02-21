export default function AdvocateTable({ filteredAdvocates, handleNextPage }: {
    filteredAdvocates: any[];
    [key: string]: any;
}) {
    return <>
        <table>
            <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
            </thead>
            <tbody>
            {filteredAdvocates.map((advocate) => {
                return (
                <tr>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                    {advocate.specialties.map((s) => (
                        <div>{s}</div>
                    ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                </tr>
                );
            })}
            </tbody>
            <button onClick={handleNextPage}>Next Page</button>
        </table>
    </>
}