import type { ApiResponseType } from "./MoviePage.tsx";
import styled from "styled-components";
import type { Dispatch, SetStateAction } from "react";

const SpecialText = styled.div`
  color: ${props => props.theme.colors.text.default};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-top: 8px;
`;

const MovieUl = styled.ul`
  list-style: none;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${props => props.theme.colors.divider};
  }
`;

const MovieLi = styled.li<{ $isSelected: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  background-color: ${props =>
    props.$isSelected ? props.theme.colors.background.default : "transparent"};

  border-left: 4px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : "transparent")};
  &:hover {
    background: ${props => props.theme.colors.background.default};
  }
`;
const MovieTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  width: 90%;
  margin-right: 8px;
`;
type MovieListProps = {
  list?: ApiResponseType;
  isLoading: boolean;
  imdbID: string;
  setImdbID: Dispatch<SetStateAction<string>>;
};

export default function MovieList({ list, isLoading, imdbID, setImdbID }: MovieListProps) {
  if (isLoading) return <SpecialText>로딩 중...</SpecialText>;
  if (!list) return <SpecialText>검색어 입력 대기중</SpecialText>;
  return list.Response === "False" ? (
    <SpecialText>
      통신 중 에러 발생! <br /> {list.Error}
    </SpecialText>
  ) : (
    <MovieUl>
      {list.Search.map(v => (
        <MovieLi
          key={v.imdbID}
          $isSelected={v.imdbID === imdbID}
          onClick={() => {
            setImdbID(v.imdbID);
            console.log("실행!");
          }}>
          <MovieTitle>{v.Title}</MovieTitle> ({v.Year})
        </MovieLi>
      ))}
    </MovieUl>
  );
}
