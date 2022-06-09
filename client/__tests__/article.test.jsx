import {act} from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {NewsApiContext} from "../newsApiContext";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Article} from "../pages/news/article";

describe("article component", () => {
    it("shows article", async () => {
        const news = [{ title: "article 1" }];
        const user = { microsoft: { name: "Testy Testsen" } };
        const element = document.createElement("div");
        await act(async () => {
            ReactDOM.render(
                <NewsApiContext.Provider value={{ listFilteredArticles: () => news }}>
                    <BrowserRouter>
                        <Article user={user}/>
                    </BrowserRouter>
                </NewsApiContext.Provider>,
                element
            );
        });
        expect(
            Array.from(element.querySelectorAll("h2")).map((e) => e.innerHTML)
        ).toEqual(["article 1"]);
        expect(element.innerHTML).toMatchSnapshot();
    })
})