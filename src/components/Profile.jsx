import React, { useState } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9f9f9;
  height: 100vh;
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

  input[type="text"] {
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

  input[type="file"] {
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

const Profile = ({user, setUser}) => {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    const response = await updateProfile(formData);

    if (response.success) {
        setUser({
            ...user,
            nickname: response.nickname,
            avatar: response.avatar,
        });
        Navigate("/");
    }
  };
  return (
    <Container>
      <h2>프로필 수정</h2>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input 
        type="text" 
        placeholder="닉네임" 
        minLength="1" 
        maxLength="10" 
        onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">프로필 이미지</label>
        <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        />
      </InputGroup>
      <Button onClick={handleUpdateProfile}>프로필 수정</Button>
    </Container>
  );
};

export default Profile;
