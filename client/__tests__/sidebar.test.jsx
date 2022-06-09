import React from "react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { NewsApiContext } from "../newsApiContext";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "../pages/sidebar/sidebar";

describe("sidebar component", () => {
  it("shows news articles", async () => {
    const news = [{ title: "article 1" }, { title: "article 2" }];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listFilteredArticles: () => news }}>
          <BrowserRouter>
            <Sidebar />
          </BrowserRouter>
        </NewsApiContext.Provider>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h4")).map((e) => e.innerHTML)
    ).toEqual([
      '<a href="/article/article 1">article 1</a>',
      '<a href="/article/article 2">article 2</a>',
    ]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows empty fields error message", () => {});
});
