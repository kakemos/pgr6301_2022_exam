import { Link } from "react-router-dom";
import React from "react";

export function FrontPageArticleCard({ news: { title, intro, author } }) {
  console.log("front page article card title " + title);

  return (
    <>
      <div className={"front-page-article-card"}>
        <hr />
        <h2 className={"front-page-title"}>
          <Link to={"/article/" + title}>{title}</Link>
        </h2>
        <h3 className={"front-page-author"}>Written by {author}</h3>
        <p className={"front-page-intro"}>{intro}</p>
      </div>
    </>
  );
}
