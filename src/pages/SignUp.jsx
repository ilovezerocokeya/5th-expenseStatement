import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api/auth";

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
  width: 95%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;

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

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(avatar);
    } else {
      setAvatarPreview(null);
    }
  }, [avatar]);

  const handleRegister = async () => {
    console.log("id", id);
    console.log("password", password);
    console.log("nickname", nickname);
    console.log("birth", birth);

    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자 이상 10글자 이내로만 가능합니다.");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4글자 이상 15글자 이내로만 가능합니다.");
      return;
    }
    if (nickname.length < 2 || nickname.length > 10) {
      alert("닉네임은 2글자 이상 10글자 이내로만 가능합니다.");
      return;
    }
    if (birth.length !== 6) {
      alert("생년월일은 6자리로 입력해주시기 바랍니다.");
      return;
    }

    // API 호출을 진짜로 하는 부분
    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
      birth: birth,
      avatar: avatar,
    });
    if (response) {
      confirm("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  };

  return (
    <Container>
      <HomeButton onClick={() => navigate("/")}>Home</HomeButton>
      {avatarPreview && <UserAvatarPreview src={avatarPreview} alt="Avatar Preview" />}
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          minLength="4"
          maxLength="10"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          minLength="4"
          maxLength="15"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          minLength="2"
          maxLength="10"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="birth">생년월일</label>
        <input
          type="text"
          id="birth"
          onChange={(e) => setBirth(e.target.value)}
          placeholder="생년월일 6자리를 입력해주세요. ex: 920528"
          maxLength="6"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">프로필 이미지</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </InputGroup>
      <Button onClick={handleRegister}>회원가입</Button>
      <ToggleButton onClick={() => navigate("/LogIn")}>
        로그인
      </ToggleButton>
    </Container>
  );
};

export default SignUp;