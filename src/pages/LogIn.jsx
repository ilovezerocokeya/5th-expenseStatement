import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 2rem;
  position: relative;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #ff4d4d;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e60000;
  }
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  color: green;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const LogIn = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { userId, nickname, avatar } = await login({
      id: id,
      password: password,
    });

    alert("로그인이 되었습니다 :)");
    setUser({ userId, nickname, avatar });
    navigate("/");
  };

  return (
    <Container>
      <HomeButton onClick={() => navigate("/")}>Home</HomeButton>
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </InputGroup>
      <Button onClick={handleSignIn}>로그인</Button>
      <ToggleButton onClick={() => navigate("/signUp")}>
        회원가입
      </ToggleButton>
    </Container>
  );
};

export default LogIn;