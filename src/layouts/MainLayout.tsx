import styled from "styled-components";
import Header from "../components/lyaout/Header.tsx";
import Home from "../pages/Home.tsx";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;
export default function MainLayout() {
  return (
    <LayoutWrapper>
      <Header />
      <MainContent>
        <Home />
      </MainContent>
    </LayoutWrapper>
  );
}
