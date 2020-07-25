import React from "react";
import { Card, Button, ListGroup, ListGroupItem, Badge } from "react-bootstrap";

export default function MovieCard({ movie, genres }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ height: "430px" }}
        variant="top"
        src={
          movie.poster_path == null
            ? `./noimage.jpg`
            : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
        }
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text style={{ overflow: "scroll", height: "200px" }}>
          {movie.overview}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Rate: {movie.vote_average}</ListGroupItem>
        <ListGroupItem>Popularilty: {movie.popularity}</ListGroupItem>
        <ListGroupItem style={{ height: "72px" }}>
          {movie.genre_ids.map((genre) => {
            return (
              <Badge variant="danger" style={{ marginRight: "10px" }}>
                {genres.find((item) => item.id == genre).name}
              </Badge>
            );
          })}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button variant="danger">View Trailer</Button>
      </Card.Body>
    </Card>
  );
}
