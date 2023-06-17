import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import EntryImg from "../src/assets/entryImg";
import Button from "../src/components/Buttons/Button";
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
  const { push } = useRouter();

  // if (session) {
  //   push("/tasks");
  // }

  return (
    <Container>
      <EntryImg />
      {!session && (
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
