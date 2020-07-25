import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-input-range/lib/css/index.css";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import MovieBoard from "./components/MovieBoard";
import Pagination from "react-js-pagination";
import FilterBoard from "./components/FilterBoard";

const apiKey = process.env.REACT_APP_APIKEY;
function App() {
  let [movieList, setMovieList] = useState(null);
  let [originalList, setOriginalList] = useState(null);
  let [page, setPage] = useState(1);
  let [totalResult, setTotalResult] = useState(0);
  let [genres, setGenres] = useState(null);
  let [keyword, setKeyword] = useState("");
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  let [rating, setRating] = useState({ min: 0, max: 10 });

  const getGenres = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    setGenres(data.genres);
    getNowPlaying(page);
  };

  const getNowPlaying = async (pageNum) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`;
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.results);
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    getNowPlaying(pageNum);
  };

  const searchByKeyword = async (e) => {
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${keyword}`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };

  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
    setOriginalList(data.results);
    setTotalResult(data.total_results);
  };

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    }
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    }
    setMovieList([...sortedList]);
  };

  const filterByRate = (value) => {
    let filteredList = originalList.filter(
      (movie) =>
        movie.vote_average > value.min && movie.vote_average < value.max
    );
    setRating(value);
    setMovieList(filteredList);
  };

  const filterByYear = (value) => {
    let filteredList = originalList.filter((movie) => {
      let year = parseInt(movie.release_date.split("-")[0]);
      return year > value.min && year < value.max;
    });
    setYear(value);
    setMovieList(filteredList);
  };

  useEffect(() => {
    getGenres();
  }, []);

  if (movieList == null) {
    return <div>loading...</div>;
  }
  return (
    <div className="background">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Bitna's Move App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#features" onClick={() => searchByTopRated()}>
            Top rated
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={(e) => searchByKeyword(e)}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="outline-danger" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>

      <Row style={{ marginTop: "40px", marginLeft: "40px" }}>
        <Col md={3}>
          <FilterBoard
            sortByRate={sortByRate}
            sortByPopular={sortByPopular}
            filterByYear={filterByYear}
            filterByRate={filterByRate}
            year={year}
            rating={rating}
          />
        </Col>
        <Col md={9}>
          <MovieBoard movieList={movieList} genres={genres} />
          <div style={{ marginTop: "30px" }}>
            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={totalResult}
              pageRangeDisplayed={5}
              onChange={(pageNum) => handlePageChange(pageNum)}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
