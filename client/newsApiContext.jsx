import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";
import { deleteJSON } from "./lib/deleteJSON";

export const NewsApiContext = React.createContext({
  async listFilteredArticles(query) {
    return await fetchJSON("/api/news?" + new URLSearchParams(query));
  },
  async addNewArticle(article) {
    return await postJSON("/api/news/new", article);
  },
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async registerLogin(provider, login) {
    return await postJSON(`/api/login/${provider}`, login);
  },
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
  async showArticle(title) {
    return await fetchJSON("/api/news?" + new URLSearchParams(title));
  },
  async deleteArticle(title) {
    return await deleteJSON("/api/news/article?" + new URLSearchParams(title));
  },
});
