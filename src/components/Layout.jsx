import React, { useEffect } from "react";
import { getUserInfo } from "../lib/api/auth";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #333;
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4d4d;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
`;

const UserName = styled.span`
  color: white;
  margin-right: 20px;
  font-size: 1rem;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e60000;
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem; /* Navbar height */
  background-color: #f9f9f9;
  min-height: calc(100vh - 60px);
`;

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/profile">내 프로필</NavItem>
        </NavItems>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Layout;