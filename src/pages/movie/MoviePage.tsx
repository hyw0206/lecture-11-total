import styled from "styled-components";
import { useEffect, useState } from "react";
import MovieSearchBar from "./MovieSearchBar.tsx";
import MovieList from "./MovieList.tsx";
import MovieDetail from "./MovieDetail.tsx";

export type ApiResponseType = {
  Search: MovieItem[];
  totalResults?: number;
  Response: string;
  Error?: string;
};

type MovieItem = {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
};

export type MovieDetail = {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Director: string;
  Response: string;
  Error?: string;
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: calc(100vh - 150px);
`;
const ListSection = styled.aside`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background.default};
  border: 1px solid ${props => props.theme.colors.divider};
  overflow: hidden;
`;
export default function MoviePage() {
  const [list, setList] = useState<ApiResponseType>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail>();
  const [imdbID, setImdbID] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieLoading, setMovieLoading] = useState(false);

  const searchMovies = (keyword: string) => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
      .then(r => r.json())
      .then((json: ApiResponseType) => {
        setList(json);
        console.log(json);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(imdbID);
    const searchOneMovie = () => {
      if (!imdbID) return;
      setMovieLoading(true);
      fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`)
        .then(r => r.json())
        .then((json: MovieDetail) => {
          setSelectedMovie(json);
          console.log(json);
        })
        .catch(e => console.log(e))
        .finally(() => setMovieLoading(false));
    };
    searchOneMovie();
  }, [imdbID]);
  return (
    <Container>
      <ListSection>
        <MovieSearchBar searchMovies={searchMovies} />
        <MovieList imdbID={imdbID} setImdbID={setImdbID} list={list} isLoading={loading} />
      </ListSection>
      <MovieDetail selectedMovie={selectedMovie} isLoading={movieLoading} />
    </Container>
  );
}
