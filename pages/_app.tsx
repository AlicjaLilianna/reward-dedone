import React from "react";
import { ApolloProviderWrapper } from "../src/components/custom_apollo_provider";
import "../styles/index.css";

import { SessionProvider } from "next-auth/react";

const MyMainWrapperComponent = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <React.StrictMode>
      <SessionProvider session={session}>
        <ApolloProviderWrapper>
          <Component {...pageProps} />
        </ApolloProviderWrapper>
      </SessionProvider>
    </React.StrictMode>
  );
};
export default MyMainWrapperComponent;
