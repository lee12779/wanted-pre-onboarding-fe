import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../axios/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function LoginPage() {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
  });
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  const { userEmail, userPassword } = inputs;

  useEffect(() => {}, [disabled]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    if (userEmail.includes("@") && userPassword.length > 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onClick = () => {
    if (!userEmail.includes("@")) {
      alert("올바른 형태로 입력해주세요!");
      return;
    } else if (userPassword.length < 8) {
      alert("비밀번호를 잘못입력하셨습니다.");
      return;
    } else {
      const response = login({
        email: userEmail,
        password: userPassword,
      });

      if (response) {
        navigate("/todo");
      }
    }
  };

  return (
    <PageContainer>
      <Header>로그인 페이지</Header>
      <Input
        name="userEmail"
        type="text"
        placeholder="이메일"
        value={userEmail}
        onChange={onChange}
      />
      <Input
        name="userPassword"
        type="password"
        placeholder="비밀번호"
        value={userPassword}
        onChange={onChange}
      />
      <Button onClick={onClick} disabled={disabled}>
        로그인
      </Button>
    </PageContainer>
  );
}

export default LoginPage;
