import { type SubmitEvent, useState } from "react";
import styled from "styled-components";
import { FaFilm } from "react-icons/fa";

type MovieSearchBarProps = {
  searchMovies: (arg0: string) => void;
};
const ListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  font-size: 18px;
  font-weight: 800;
  color: ${props => props.theme.colors.text.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const ListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 1px solid #999;
  border-radius: 8px;
  min-width: 0;
`;
const SearchButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(255, 0, 0, 0.8);
  border: 1px solid #999;
  color: white;
`;
export default function MovieSearchBar({ searchMovies }: MovieSearchBarProps) {
  const onSubmitSearchMovies = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    searchMovies(keyword);
  };

  const [keyword, setKeyword] = useState("");
  return (
    <>
      <ListHeader>
        <ListTitle>
          <FaFilm /> 영화 검색 시스템
        </ListTitle>
        <SearchForm onSubmit={onSubmitSearchMovies}>
          <SearchInput
            type={"text"}
            placeholder={"영화 검색.."}
            onChange={e => setKeyword(e.target.value)}
            value={keyword}
          />
          <SearchButton type={"submit"}>검색</SearchButton>
        </SearchForm>
      </ListHeader>
    </>
  );
}
