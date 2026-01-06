import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var() --color-grey-0;
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const ContainerStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const AppLayout = () => {
  return (
    <StyleAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <ContainerStyle>
          <Outlet />
        </ContainerStyle>
      </Main>
    </StyleAppLayout>
  );
};

export default AppLayout;
