import React, { useContext, useState } from "react";
import { NewsApiContext } from "../../newsApiContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoading } from "../../lib/useLoading";

export function DeleteArticle({ user }) {
  const { deleteArticle, listFilteredArticles } = useContext(NewsApiContext);
  const { title, setTitle } = useState("");
  const navigate = useNavigate();
  const { loading, error, data } = useLoading(
    async () => await listFilteredArticles({ author: user?.microsoft?.name }),
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

  async function handleSubmit(event) {
    event.preventDefault();
    await deleteArticle({ title });
    navigate("/");
  }

  if (!user.microsoft) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h2>Overview of all your articles.</h2>
      <h3>Which one do you wanna delete?</h3>
      <form onSubmit={handleSubmit}>
        {data.map((article) => (
          <>
            <input
              type={"radio"}
              name={"delete-articles"}
              value={article.title}
              onChange={() => setTitle(article.title)}
            />
            <label htmlFor={article.title}>{article.title}</label>
            <p>{article.intro}</p>
          </>
        ))}
        <button>Delete</button>
      </form>
    </>
  );
}
