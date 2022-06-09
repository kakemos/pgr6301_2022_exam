import { Link } from "react-router-dom";
import React from "react";

export function ErrorEmptyFields() {
  return (
    <>
      <p id={"empty-fields-error"}>You need to fill in all the fields!</p>
      <Link to={"/news/article/new"}>Try again.</Link>
    </>
  );
}
