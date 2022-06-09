import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import {NewsApiContext} from "../newsApiContext";
import {BrowserRouter} from "react-router-dom";
import {DeleteArticle} from "../pages/news/deleteArticle";

describe("delete article component", () => {
    it("shows author's own articles", async () => {
        const news = [{ title: "article 1", author: "Testy" }, { title: "article 2", author: "Testy" }];
        const user = { microsoft: { name: "Testy" } };
        const domElement = document.createElement("div");
        await act(async () => {
            ReactDOM.render(
                <NewsApiContext.Provider value={{ listFilteredArticles: () => news  }}>
                    <BrowserRouter>
                        <DeleteArticle user={user}/>
                    </BrowserRouter>
                </NewsApiContext.Provider>,
                domElement
            );
        });
        expect(
            Array.from(domElement.querySelectorAll("label")).map((e) => e.innerHTML)
        ).toEqual(["article 1", "article 2"]);
        expect(domElement.innerHTML).toMatchSnapshot();

    })
});