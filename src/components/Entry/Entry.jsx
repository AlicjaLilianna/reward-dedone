import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { setContext } from "@apollo/client/link/context";

import EntryImg from "../../assets/entryImg";
import Button from "../Buttons/Button";
import { useApolloClient } from "@apollo/client";
const Container = styled("div")`
  margin: 15vh auto 0;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Entry() {
  const [profile, setProfile] = useState([]);
  const client = useApolloClient();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: tokenResponse?.access_token
              ? `Bearer ${tokenResponse.access_token}`
              : "",
          },
        };
      });
      client.setLink(authLink.concat(client.link));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <Container>
      <EntryImg />
      {profile ? (
        <Button btnText="Log out" btnEvent={logOut} btnClass="btn-primary" />
      ) : (
        <Button
          btnText="Let's start!"
          btnEvent={login}
          btnClass="btn-primary"
        />
      )}
    </Container>
  );
}

export default Entry;
1;
