import { randomString } from "../../lib/randomString";
import { sha256 } from "../../lib/sha256";
import React from "react";

export function LoginButton({ config, label, provider }) {
  async function handleLogin() {
    const {
      authorization_endpoint,
      response_type,
      scope,
      client_id,
      code_challenge_method,
    } = config[provider];

    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);
    const redirect_uri = `${window.location.origin}/login/${provider}/callback`;

    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      state,
      scope,
      redirect_uri,
    };

    if (code_challenge_method) {
      const state = randomString(50);
      const code_verifier = randomString(50);
      window.sessionStorage.setItem("authorization_state", state);
      window.sessionStorage.setItem("code_verifier", code_verifier);
      parameters.code_challenge_method = code_challenge_method;
      parameters.code_challenge = await sha256(code_verifier);
    }

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <div>
      <button className={"login-button"} onClick={handleLogin}>
        {label}
      </button>
    </div>
  );
}
