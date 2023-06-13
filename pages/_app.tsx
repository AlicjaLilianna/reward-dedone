import React from "react";
import styled from "@emotion/styled";
import { ApolloProviderWrapper } from "../src/components/custom_apollo_provider";
import "../styles/index.css";

import { SessionProvider } from "next-auth/react";

const MyMainWrapperComponent = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const App = styled("div")`
    max-width: 486px;
    margin: 0 auto;
    background-color: #f0f3fa;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
  `;
  return (
    <App>
      <React.StrictMode>
        <SessionProvider session={session}>
          <ApolloProviderWrapper>
            <Component {...pageProps} />
          </ApolloProviderWrapper>
        </SessionProvider>
      </React.StrictMode>
    </App>
  );
};
export default MyMainWrapperComponent;
