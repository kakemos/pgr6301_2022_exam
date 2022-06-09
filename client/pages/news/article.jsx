import React, { useContext } from "react";
import { NewsApiContext } from "../../newsApiContext";
import { Navigate, useParams } from "react-router-dom";
import { useLoading } from "../../lib/useLoading";
import { ArticleCard } from "./articleCard";

export function Article({ user }) {
  const { listFilteredArticles } = useContext(NewsApiContext);
  const { title } = useParams();
  const { loading, error, data } = useLoading(
    async () => await listFilteredArticles({ title: title }),
    []
  );

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

  if (!user.microsoft && !user.google) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {data.map((news) => (
        <>
          <ArticleCard key={news.title} news={news} />
        </>
      ))}
    </>
  );
}
