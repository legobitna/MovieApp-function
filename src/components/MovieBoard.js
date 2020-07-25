import React from "react";
import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";

export default function MovieBoard({ movieList, genres }) {
  return (
    <Row>
      {movieList.map((movie) => {
        return (
          <Col md={4}>
            <MovieCard movie={movie} genres={genres} />
          </Col>
        );
      })}
    </Row>
  );
}
