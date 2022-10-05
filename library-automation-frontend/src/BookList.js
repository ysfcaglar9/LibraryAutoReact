import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function BookList({ book }) {

    const [postBook, setPostBook] = useState("http://localhost:5184/api/Reservation/saveBook");
    const [deleteBook, setDeleteBook] = useState("http://localhost:5184/api/Reservation/DeleteBook/");
    const [postReservation, setPostReservation] = useState("http://localhost:5184/api/Reservation/saveReservation");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    var selectedBook = {};

    const reservedName = useRef(null);
    const reservedBook = useRef(null);


    const author = useRef(null);
    const name = useRef(null);
    const numberOfPages = useRef(null);
    const publisher = useRef(null);
    const type = useRef(null);
    const year = useRef(null);

    //tablodaki reserve book butonuna basıldığında o satıra ait bilgileri selectedBook nesnesine atıyor
    function openReservationDialog(e) {
        debugger

        console.log(e);
        selectedBook = e
        console.log(selectedBook);
    }

    //tablodaki delete book butonuna basıldığında o satıra ait kitabın idsini alıp enpointin sonuna ekliyor
    function deleteBookFromList(event) {
        debugger
        console.log(event);
        //burada endpointin sonuna bookid yi ekliyor
        axios.delete(deleteBook + event.bookId).then(res => {
            console.log(res)

            window.location.reload();

        })

    }

    //popup ın içindeki reserve book butonuna basınca seçilen kitabın idsini reserveObj nesnesindeki bookId alanına atıyor böylece apiye
    //gittiğinde hangi kitaba rezerve edileceği biliniyor
    function createReservation() {
        debugger

        const reserveObj = {
            "reservedId": Math.floor(Math.random() * 10000),
            "bookId": selectedBook.bookId ?? 13,
            "reservedModelId": Math.floor(Math.random() * 10000),
            "name": "test",
            "startingDate": startDate,
            "endingDate": endDate,
            "reservedBook": "test"
        }
        console.log(reserveObj)

        axios.post(postReservation, reserveObj).then(res => {
            console.log(res)
            if (res.data.message == "Success") {

                alert("Book reserved successfully!")

                window.location.reload();

            }
        })

    }

    //save book butonuna basınca inputlardaki değerleri alıp bookObj nesnesini dolduruyor apiye postBook endpointi ile bookObj nesnesini gönderiyor
    function saveBook() {
        debugger

        if (name.current.value != '' && author.current.value != '' && publisher.current.value != '' && year.current.value != null && type.current.value != '' && numberOfPages.current.value != null) {

            const bookObj = {
                "bookId": Math.floor(Math.random() * 10000),
                "name": name.current.value,
                "author": author.current.value,
                "publisher": publisher.current.value,
                "year": year.current.value,
                "typeOfBook": type.current.value,
                "numberOfPages": numberOfPages.current.value
            }

            axios.post(postBook, bookObj).then(res => {
                console.log(res)
                if (res.data.message == "Success") {

                    alert("Book added successfully!")

                    window.location.reload();

                }
            })

        } else {

            alert("Fields are cannot be empty!")

        }



    }

    return (
        <div>
            <div>  

                <div style={{ paddingLeft: "20px" }}>
                    <h2>
                        Add New Book
                    </h2>
                </div>

                <div style={{ padding: "20px" }} className="d-flex" >

                    <input type="text" ref={author} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Author"></input>
                    <input type="text" ref={name} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Name"></input>
                    <input type="number" ref={numberOfPages} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Pages"></input>
                    <input type="text" ref={publisher} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Publisher"></input>
                    <input type="text" ref={type} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Type"></input>
                    <input type="number" ref={year} style={{ width: "200px", marginRight: '20px' }} className="form-control" placeholder="Year"></input>

                    <button className='btn btn-primary' onClick={saveBook} >Save</button>

                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID </th>
                            <th scope="col">Author </th>
                            <th scope="col">Name </th>
                            <th scope="col">Pages </th>
                            <th scope="col">Publisher </th>
                            <th scope="col">Type </th>
                            <th scope="col">Year </th>
                            <th scope="col">Option</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>

                    {book.map(p => (
                        <tbody key={p.bookId}>
                            <tr>
                                <th scope="row"> {p.bookId}</th>
                                <td> {p.author}</td>
                                <td> {p.name}</td>
                                <td> {p.numberOfPages}</td>
                                <td> {p.publisher}</td>
                                <td> {p.typeOfBook}</td>
                                <td> {p.year}</td>
                                <td>
                                    <button type="button" onClick={() => openReservationDialog(p)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Reserve Book
                                    </button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => deleteBookFromList(p)} className="btn btn-danger">
                                        Delete Book
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className='d-flex p-2' >
                                    <div>
                                        Start Date
                                        <DatePicker selected={startDate} onChange={(date) =>
                                            setStartDate(date)} />
                                    </div>
                                    <div>
                                        End Date
                                        <DatePicker selected={endDate} onChange={(date) =>
                                            setEndDate(date)} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={createReservation} type="button" className="btn btn-primary">Reserve Book</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
} 