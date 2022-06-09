import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { LoginButton } from "./loginButton";
import { LoginCallback } from "./loginCallback";
import { NewsApiContext } from "../../newsApiContext";

export function EndSession({ reload }) {
  const navigate = useNavigate();
  const { endSession } = useContext(NewsApiContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function StartLogin({ config }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton
        label={"Login with Google"}
        config={config}
        provider={"google"}
      />
      <LoginButton
        label={"Login with Microsoft"}
        config={config}
        provider={"microsoft"}
      />
    </div>
  );
}

export function LoginPage({ config, reload }) {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin config={config} />} />
      <Route
        path={"/:provider/callback"}
        element={<LoginCallback config={config} reload={reload} />}
      />
      <Route path={"/end-session"} element={<EndSession reload={reload} />} />
      <Route path={"*"} element={<StartLogin config={config} />} />
    </Routes>
  );
}
