import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import EntryImg from "../../assets/entryImg";
import Button from "../Buttons/Button";
const Container = styled("div")`
  margin: 15vh auto 0;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const { data: session } = useSession();

  return (
    <Container>
      <EntryImg />
      {session ? (
        <Button
          btnText="Log out"
          btnEvent={() => signOut()}
          btnClass="btn-primary"
        />
      ) : (
        <Button
          btnText="Let's start!"
          btnEvent={() => signIn()}
          btnClass="btn-primary"
        />
      )}
    </Container>
  );
}

export default Login;
