import React from "react";

export function LiveNewsCard({ news: { title, intro } }) {
  return (
    <>
      <div className={"live-news-card"}>
        <hr />
        <h4 className={"live-news-title"}>
          <a href={"/article/" + title}>{title}</a>
        </h4>
        <p className={"live-news-intro"}>{intro}</p>
      </div>
    </>
  );
}
