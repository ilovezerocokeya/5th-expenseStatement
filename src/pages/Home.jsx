import styled from "styled-components";
import { useEffect, useState } from "react";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import CreateExpense from "../components/CreateExpense";
import { getUserInfo } from "../lib/api/auth";

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

export default function Home() {
  const [month, setMonth] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUser(userInfo);
      } else {
        console.error("Failed to fetch user info");
      }
    }
    fetchUserInfo();
  }, []);

  
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense
        user={user}
        month={month}
      />
      <ExpenseList />
    </Container>
  );
}