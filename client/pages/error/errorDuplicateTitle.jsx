import { Link } from "react-router-dom";
import React from "react";

export function ErrorDuplicateTitle() {
  return (
    <>
      <p id={"duplicate-error"}>That title already exists.</p>
      <Link to={"/news/article/new"}>Try again.</Link>
    </>
  );
}
