import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

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
    color: #bbb;
    font-weight: bold;
  }

  input[type="text"],
  input[type="file"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #444;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #333;
    color: #e0e0e0;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserAvatarPreview = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
  border: 2px solid #007bff;
`;

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(avatar);
    }
  }, [avatar]);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <h2>프로필 수정</h2>
      {avatarPreview && <UserAvatarPreview src={avatarPreview} alt="Avatar Preview" />}
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          placeholder="닉네임"
          value={nickname}
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
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
      <Button onClick={handleUpdateProfile}>프로필 수정</Button>
    </Container>
  );
};

export default Profile;