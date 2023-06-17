import { PropsWithChildren, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "next-auth/jwt";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
