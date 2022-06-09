import React, { useContext, useEffect, useState } from "react";
import { NewsApiContext } from "../../newsApiContext";
import { Navigate, useNavigate } from "react-router-dom";
import { FormInput, FormInputTextArea } from "../../lib/formInput";
import { useLoading } from "../../lib/useLoading";

export function AddNewArticle({ user }) {
  const { addNewArticle, listFilteredArticles } = useContext(NewsApiContext);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("general");
  const [author, setAuthor] = useState(user?.microsoft?.name);
  const [ws, setWs] = useState("");
  const navigate = useNavigate();
  const { loading, error, data } = useLoading(
    async () => await listFilteredArticles({ title: title }),
    []
  );

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    setWs(ws);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (title === "" || intro === "" || article === "") {
      return navigate("/error-empty-fields");
    } else if (title === data.title) {
      return navigate("error-duplicate-title");
    } else {
      await addNewArticle({ title, intro, article, category, author });
      ws.send(JSON.stringify({ title, intro }));
      navigate(`/article/${title}`);
    }
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

  if (!user.microsoft) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <h1>Write new article.</h1>
      <form onSubmit={handleSubmit}>
        <h4>Author: {author}</h4>
        <FormInput label={"Title"} value={title} onChangeValue={setTitle} />
        <FormInput label={"Intro"} value={intro} onChangeValue={setIntro} />
        <div className={"form-input"}>
          <div>
            <label htmlFor="dog-names">
              <strong>Category</strong>
            </label>
          </div>
          <select
            className={"new-article-dropdown"}
            name="categories"
            id="category-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="fashion">Fashion</option>
            <option value="art">Art</option>
            <option value="travel">Travel</option>
            <option value="celebrity">Celebrity</option>
          </select>
        </div>
        <FormInputTextArea
          label={"Article"}
          value={article}
          onChangeValue={setArticle}
        />
        <div>
          <button className={"submit-article-button"}>Submit article</button>
        </div>
      </form>
    </>
  );
}
