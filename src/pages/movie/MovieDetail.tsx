import type { MovieDetail } from "./MoviePage.tsx";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

type MovieDetailProps = {
  selectedMovie: MovieDetail;
  isLoading: boolean;
};
const DetailSection = styled.div`
  flex: 2;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.divider};
`;

const EmptyDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.text.disabled};
  gap: 15px;

  svg {
    font-size: 48px;
    opacity: 0.5;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};

  h2 {
    font-size: 32px;
    color: ${props => props.theme.colors.primary};
  }
  span {
    font-size: 20px;
    color: ${props => props.theme.colors.text.disabled};
    margin-bottom: 4px;
  }
`;
const MovieDetailPoster = styled.img`
  width: 300px;
  height: 350px;
`;

export default function MovieDetail({ selectedMovie, isLoading }: MovieDetailProps) {
  if (!selectedMovie || isLoading)
    return (
      <DetailSection>
        <EmptyDetail>
          {isLoading ? (
            <p style={{ fontSize: "3rem" }}>로딩중...</p>
          ) : (
            <>
              <FaInfoCircle />
              <p>좌측 목록에서 영화를 선택해주세요!</p>
            </>
          )}
        </EmptyDetail>
      </DetailSection>
    );
  return (
    <DetailSection>
      <DetailHeader>
        <h2>
          {selectedMovie.Title} ({selectedMovie.Year})
        </h2>
        <span>{selectedMovie.Director}</span>
      </DetailHeader>
      <MovieDetailPoster src={selectedMovie.Poster} alt={selectedMovie.Title} />
      <div>{selectedMovie.Plot}</div>
    </DetailSection>
  );
}
