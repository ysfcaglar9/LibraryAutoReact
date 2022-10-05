import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import ReservationList from "./reservationList";
import axios from "axios";
import { useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [book, setBook] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [reservation, setReservation] = useState([])
  const [loading, setLoading] = useState(true)
  //endpointler
  const [getBooks, setGetBooks] = useState("http://localhost:5184/api/Reservation/GetBooks")
  const [getBooksById, setgetBooksById] = useState("http://localhost:5184/api/Reservation/GetBooksById/")
  const [getReservations, setgetReservations] = useState("http://localhost:5184/api/Reservation/getReservations")
  
  const searchValue = useRef(null);

  //kitap listesi çekildi
  useEffect(() => {
    setLoading(true)
    axios.get(getBooks).then(res => { 
      setLoading(false)
      console.log(res.data.responseData) 
      setBook(res.data.responseData.map(p => p))
    })

  }, [])


  function search() {

    let bookId;

    if (searchValue.current.value != '') {

      book.forEach(book => {
        //tüm kitapları tek tek dönerek isimleri birbirine denk olan kitabın idsini alıyor
        if (book.name == searchValue.current.value) {
          bookId = book.bookId

        }

      });

      setLoading(true)
      axios.get(getBooksById + bookId).then(res => {
        setLoading(false)
        let data = res.data.responseData

        let bookArr = []

        bookArr.push(data)

        setBook(bookArr.map(p => p))
      })

    } else {
      //search inputu boşsa tüm kitapları çekiyor
      setLoading(true)
      axios.get(getBooks).then(res => {
        setLoading(false)
        console.log(res.data.responseData)
        setBook(res.data.responseData.map(p => p))
      })
    }


  }

  //sayfa açıldığında rezervasyonları çekiyor
  useEffect(() => {
    setLoading(true)
    axios.get(getReservations).then(res => {
      setLoading(false)
      console.log(res.data.responseData)
      setReservation(res.data.responseData.map(p => p))
    })

  }, [])


  if (loading) return "Loading..."


  //  <Link to="/">Home</Link>
  return (
    <div>

      <div style={{ padding: "20px" }} className="d-flex" >

        <input type="text" ref={searchValue} style={{ width: "200px" }} className="form-control" placeholder="Search"></input>
        <button className='btn btn-primary' onClick={search} >Search</button>

      </div>

      <Router>
        <Switch>
          <Route exact path={"/"}>
            <BookList book={book} />
          </Route>
          <Route path={"/reservation-list"}>
            <ReservationList reservation={reservation} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
