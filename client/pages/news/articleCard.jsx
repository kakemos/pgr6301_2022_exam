import React from "react";

export function ArticleCard({
  news: { title, intro, author, category, article },
}) {
  return (
    <>
      <div className={"article-card"}>
        <h1 className={"article-title"}>{title}</h1>
        <hr />
        <div className={"article-under-header"}>
          <h4>Written by {author}</h4>
          <h4>category: {category}</h4>
        </div>
        <p>{intro}</p>
        <p>{article}</p>
      </div>
    </>
  );
}
