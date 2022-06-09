import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {PreviewAllArticles} from "../pages/news/previewAllArticles";
import {NewsApiContext} from "../newsApiContext";
import {BrowserRouter} from "react-router-dom";

describe("previewAllArticles component", () => {
    it("shows loading screen", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(<PreviewAllArticles />, domElement);

        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("shows articles", async () => {
        const news = [{ title: "article 1" }, { title: "article 2" }];
        const domElement = document.createElement("div");
        await act(async () => {
            ReactDOM.render(
                <NewsApiContext.Provider value={{ listFilteredArticles: () => news }}>
                    <BrowserRouter>
                        <PreviewAllArticles />
                    </BrowserRouter>
                </NewsApiContext.Provider>,
                domElement
            );
        });
        expect(
            Array.from(domElement.querySelectorAll("h2")).map((e) => e.innerHTML)
        ).toEqual(["<a href=\"/article/article 1\">article 1</a>", "<a href=\"/article/article 2\">article 2</a>"]);
        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("queries by country", async () => {
        const domElement = document.createElement("div");
        const listFilteredArticles = jest.fn(() => []);
        await act(async () => {
            ReactDOM.render(
                <NewsApiContext.Provider value={{ listFilteredArticles }}>
                    <PreviewAllArticles />
                </NewsApiContext.Provider>,
                domElement
            );
        });
        Simulate.change(domElement.querySelector("#category-query"), {
            target: { value: "celebrity" },
        });
        await act(async () => {
            await Simulate.submit(domElement.querySelector("form"));
        });
        expect(listFilteredArticles).toHaveBeenCalledWith({
            category: "celebrity",
        });
    });

    it("shows error message", async () => {
        const domElement = document.createElement("div");
        await act(async () => {
            const listFilteredArticles = () => {
                throw new Error("Something went wrong");
            };
            ReactDOM.render(
                <NewsApiContext.Provider value={{ listFilteredArticles }}>
                    <PreviewAllArticles />
                </NewsApiContext.Provider>,
                domElement
            );
        });

        expect(domElement.querySelector("#error-text").innerHTML).toEqual(
            "Error: Something went wrong"
        );
        expect(domElement.innerHTML).toMatchSnapshot();
    });
});
