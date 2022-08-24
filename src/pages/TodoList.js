import React, { useEffect, useState } from "react";
import { getStorage } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { createTodo, getTodo, updateTodo, deleteTodo } from "../axios/api";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function TodoList() {
  const access_token = getStorage("access_token");
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [userId, setUserId] = useState("");
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  const onCreate = () => {
    createTodo({
      todo,
    });
  };

  const onUpdate = (e) => {
    setUpdated(true);
    let data = e.currentTarget.closest("li");
    setUserId(data.dataset.id);
    data = data.innerText.split(" | ");

    setTodo(data[0]);
  };

  const onModified = (e) => {
    updateTodo(userId, { todo, isCompleted: checked });
    setUpdated(false);
  };

  const onReset = () => {
    setUpdated(false);
  };

  const onRemove = (e) => {
    let data = e.currentTarget.closest("li");
    deleteTodo(data.dataset.id);
  };

  const onChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!(access_token.length > 0)) {
      navigate("/");
    } else {
      getTodo().then((response) => setTodos(response.data));
    }
  }, []);

  return (
    <PageContainer>
      <Header>Todo List</Header>
      {updated ? (
        <>
          할일 수정
          <Input name="todo" value={todo} type="text" onChange={onChange} />
          완료 여부{" "}
          <Input
            type="checkbox"
            name="completed"
            value="완료"
            onChange={onChecked}
          />
          <Button onClick={onModified}>수정</Button>
          <Button onClick={onReset}>취소</Button>
        </>
      ) : (
        <>
          <Input
            name="todo"
            type="text"
            placeholder="할일"
            value={todo}
            onChange={onChange}
          />
          <Button onClick={onCreate}>추가</Button>
        </>
      )}

      <ol>
        {todos.map((todo) => (
          <li key={todo.id} data-id={todo.id}>
            {todo["todo"]} | {todo.isCompleted ? "완료" : "미완료"}
            <Button onClick={onUpdate}>수정</Button>
            <Button onClick={onRemove}>삭제</Button>
          </li>
        ))}
      </ol>
    </PageContainer>
  );
}
