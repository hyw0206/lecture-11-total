import { useState, type SubmitEvent, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
`;

const InputSection = styled.form`
  display: flex;
  gap: 10px;
  padding: 20px;
  border-radius: 16px;
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.divider};
  background: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.default};
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const AddButton = styled.button`
  padding: 0 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  &:hover {
    opacity: 0.9;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TodoItem = styled.li<{ $isCompleted: boolean }>`
  background: ${props => props.theme.colors.background.paper};
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.divider};
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.5s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
  span {
    flex: 1;
    font-size: 16px;
    color: ${props =>
      props.$isCompleted ? props.theme.colors.text.disabled : props.theme.colors.text.default};
    text-decoration: ${props => (props.$isCompleted ? "line-through" : "none")};
  }
`;

const IconButton = styled.button<{ $colorType: "success" | "error" | "warning" | "info" }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: all 0.3s;
  color: ${props => props.theme.colors[props.$colorType]};

  &:hover {
    opacity: 1;
  }
`;

export default function TodoPage() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(() => {
    // todos가 로컬 스트로지에 있다면 그 값을 JSON으로 파싱한 값
    // 아니라면 빈 배열을 저장한당
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const handleAddTodo = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: TodoType = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  useEffect(() => {
    // Arr -> json으로 바꿔서 저장
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(v => {
        return v.id === id ? { ...v, isCompleted: !v.isCompleted } : v;
      }),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(value => value.id !== id));
  };
  return (
    <Container>
      <Title>Todo List</Title>
      <InputSection onSubmit={handleAddTodo}>
        <StyledInput
          placeholder={"오늘의 할 일 입력"}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <AddButton type={"submit"}>
          <FaPlus />
        </AddButton>
      </InputSection>
      <TodoList>
        {todos.map(v => (
          <TodoItem key={v.id} $isCompleted={v.isCompleted}>
            <IconButton $colorType={"success"} onClick={() => toggleTodo(v.id)}>
              <FaCheck />
            </IconButton>
            <span>{v.text}</span>
            <IconButton $colorType={"error"} onClick={() => deleteTodo(v.id)}>
              <FaTrash />
            </IconButton>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}
