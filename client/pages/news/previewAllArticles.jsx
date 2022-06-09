import React, { useContext, useState } from "react";
import { NewsApiContext } from "../../newsApiContext";
import { useLoading } from "../../lib/useLoading";
import { FrontPageArticleCard } from "./frontPageArticleCard";

export function PreviewAllArticles() {
  const { listFilteredArticles } = useContext(NewsApiContext);
  const [category, setCategory] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const { loading, error, data } = useLoading(
    async () => await listFilteredArticles({ category }),
    [category]
  );

  function handleSubmitQuery(e) {
    e.preventDefault();
    setCategory(categoryQuery);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmitQuery}>
          <input
            type={"radio"}
            name={"filter-news"}
            value={"all"}
            onChange={() => setCategoryQuery("")}
          />
          <label htmlFor={"all"}>All</label>
          <input
            type={"radio"}
            name={"filter-news"}
            value={"general"}
            onChange={() => setCategoryQuery("general")}
          />
          <label htmlFor={"general"}>General</label>
          <input
            type={"radio"}
            name={"filter-news"}
            value={"fashion"}
            onChange={() => setCategoryQuery("fashion")}
          />
          <label htmlFor={"fashion"}>Fashion</label>
          <input
            type={"radio"}
            name={"filter-news"}
            value={"art"}
            onChange={() => setCategoryQuery("art")}
          />
          <label htmlFor={"art"}>Art</label>
          <input
            type={"radio"}
            name={"filter-news"}
            value={"travel"}
            onChange={() => setCategoryQuery("travel")}
          />
          <label htmlFor={"travel"}>Travel</label>
          <input
            type={"radio"}
            name={"filter-news"}
            id={"category-query"}
            value={"celebrity"}
            onChange={() => setCategoryQuery("celebrity")}
          />
          <label htmlFor={"celebrity"}>Celebrity</label>

          <button className={"filter-frontpage-article-button"}>Filter</button>
        </form>
      </div>

      {data.map((news) => (
        <FrontPageArticleCard key={news.title} news={news} />
      ))}
    </>
  );
}
