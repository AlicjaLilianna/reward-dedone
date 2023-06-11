import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/index.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const MyMainWrapperComponent = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.StrictMode>
  );
};
export default MyMainWrapperComponent;
