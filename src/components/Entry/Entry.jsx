import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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

function Entry() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigate("/tasks", { replace: true });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

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
