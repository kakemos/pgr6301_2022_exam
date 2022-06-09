import fetch from "node-fetch";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

export async function googleConfig() {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(
    discovery_endpoint
  );
  return {
    response_type: "token",
    authorization_endpoint,
    scope: "profile email",
    userinfo_endpoint,
    client_id,
  };
}

export async function microsoftConfig() {
  const discovery_endpoint =
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration";
  const client_id = process.env.MICROSOFT_CLIENT_ID;
  const { userinfo_endpoint, authorization_endpoint, token_endpoint } =
    await fetchJSON(discovery_endpoint);
  return {
    response_type: "code",
    response_mode: "fragment",
    authorization_endpoint,
    userinfo_endpoint,
    token_endpoint,
    client_id,
    scope: "openid",
    code_challenge_method: "S256",
  };
}

async function fetchUser(access_token, config) {
  const userinfo = await fetch(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (userinfo.ok) {
    return await userinfo.json();
  } else {
    console.log(`Failed to fetch token: ${userinfo.status}`);
    return undefined;
  }
}

export async function getUser(req, res) {
  const config = {
    google: await googleConfig(),
    microsoft: await microsoftConfig(),
  };
  const response = { config, user: {} };

  const { google_access_token, microsoft_access_token } = req.signedCookies;
  console.log({ google_access_token, microsoft_access_token });

  if (google_access_token) {
    response.user.google = await fetchUser(google_access_token, config.google);
  }
  if (microsoft_access_token) {
    response.user.microsoft = await fetchUser(
      microsoft_access_token,
      config.microsoft
    );
  }
  return res.json(response);
}

export async function logOutUser(req, res) {
  res.clearCookie("google_access_token");
  res.clearCookie("microsoft_access_token");
  res.clearCookie("user");
  res.clearCookie("author");
  res.sendStatus(200);
}

export async function setLoginCookie(req, res) {
  const { provider } = req.params;
  const { access_token } = req.body;
  res.cookie(`${provider}_access_token`, access_token, { signed: true });

  if (provider === "microsoft") {
    res.cookie("author", access_token, { signed: true });
  } else if (provider === "google") {
    res.cookie("user", access_token, { signed: true });
  }
  res.sendStatus(200);
}
