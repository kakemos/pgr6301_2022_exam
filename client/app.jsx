import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontpage/frontPage";
import { Article } from "./pages/news/article";
import { AddNewArticle } from "./pages/news/addNewArticle";
import { LoginPage } from "./pages/login/loginPage";
import { Profile } from "./pages/login/profile";
import { useContext } from "react";
import { useLoading } from "./lib/useLoading";
import { NewsApiContext } from "./newsApiContext";
import { Sidebar } from "./pages/sidebar/sidebar";
import "./app.css";
import { DeleteArticle } from "./pages/news/deleteArticle";
import { ErrorEmptyFields } from "./pages/error/errorEmptyFields";
import { ErrorDuplicateTitle } from "./pages/error/errorDuplicateTitle";

function UserActions({ user }) {
  if (!user || Object.keys(user).length === 0) {
    return <Link to={"/login"}>Login</Link>;
  }

  return (
    <>
      <Link to={"/profile"}>
        {user.google?.name
          ? `Profile for ${user.google.name}`
          : `Profile for ${user.microsoft.name}`}
      </Link>
      <Link to={"/login/end-session"}>Log out</Link>
    </>
  );
}

function AuthorLoggedIn({ user }) {
  if (!user || user?.google?.name || Object.keys(user).length === 0) {
    return null;
  }

  if (user?.microsoft) {
    return (
      <>
        <Link to={"/news/article/new"}>Write new article</Link>
        <Link to={"/news/article/delete"}>Delete article</Link>
      </>
    );
  }
}

export function Application() {
  const { fetchLogin } = useContext(NewsApiContext);
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <div className={"page-wrap"}>
        <header>
          <Link to={"/"}>Front page</Link>
          <AuthorLoggedIn user={data?.user} />
          <div className="menu-divider" />
          <UserActions user={data?.user} />
        </header>
        <aside id={"sidebar"}>
          <Sidebar />
        </aside>
        <main>
          <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route
              path={"/article/:title"}
              element={<Article user={data?.user} />}
            />
            <Route
              path={"/news/article/new"}
              element={<AddNewArticle user={data?.user} />}
            />
            <Route
              path={"/news/article/delete"}
              element={<DeleteArticle user={data?.user} />}
            />
            <Route
              path={"/error-empty-fields"}
              element={<ErrorEmptyFields />}
            />
            <Route
              path={"/error-duplicate-title"}
              element={<ErrorDuplicateTitle />}
            />
            <Route
              path={"/login/*"}
              element={
                <LoginPage
                  config={data.config}
                  reload={reload}
                  user={data?.user}
                />
              }
            />
            <Route path={"/profile"} element={<Profile user={data?.user} />} />
            <Route path={"*"} element={<h1>Not found</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
