import React from "react";

export function Profile({ user }) {
  return (
    <>
      <h1>
        {user.google?.name
          ? `Profile for ${user.google.name}`
          : `Profile for ${user.microsoft.name}`}
      </h1>
      <h3>{user.google?.email ? user.google?.email : user.microsoft?.email}</h3>
      <div>
        <img src={user.google?.picture ? user.google?.picture : null} />
      </div>
    </>
  );
}
