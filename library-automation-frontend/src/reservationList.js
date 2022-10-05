import React from 'react'

export default function ReservationList({ reservation }) {
    return (
        <div>

        <div>
            <h3>
                Reservation List
            </h3>
        </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID </th>
                        <th scope="col">Reserve ID </th>
                        <th scope="col">Name </th>
                        <th scope="col">Book </th>
                        <th scope="col">Start Date </th>
                        <th scope="col">End Date </th>
                    </tr>
                </thead>
               
                {reservation.map(p => (
                    <tbody key={p.bookId}>
                        <tr>
                            <th scope="row"> {p.bookId}</th>
                            <td> {p.reservedModelId}</td>
                            <td> {p.name}</td>
                            <td> {p.reservedBook}</td>
                            <td> {p.startingDate}</td>
                            <td> {p.endingDate}</td>
                        </tr>
                    </tbody>
                ))}
            </table>

        </div>
    )
}
