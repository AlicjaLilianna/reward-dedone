import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/index.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const MyMainWrapperComponent = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        key={process.env.REACY_APP_API_KEY}
      >
        {/* TODO: ApolloProvider should only start when logged in */}
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};
export default MyMainWrapperComponent;
