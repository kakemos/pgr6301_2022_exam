import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AddNewArticle } from "../pages/news/addNewArticle";
import { NewsApiContext } from "../newsApiContext";
import { act, Simulate } from "react-dom/test-utils";

describe("add movie component", () => {
  it("shows movies form", () => {
    const element = document.createElement("div");
    const user = { microsoft: { name: "Testy Testsen" } };
    ReactDOM.render(
      <MemoryRouter>
        <AddNewArticle user={user} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title", "Intro", "Category", "Article"]);
  });

  it("should show article", () => {});

  it("refuse to add article with empty fields", () => {
    const addNewArticle = jest.fn();
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);
    const user = { microsoft: { name: "Testy Testsen" } };
    const element = document.createElement("div");
    ReactDOM.render(
      <NewsApiContext.Provider value={{ addNewArticle }}>
        <MemoryRouter>
          <AddNewArticle user={user} />
        </MemoryRouter>
      </NewsApiContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: "" },
    });
    Simulate.submit(element.querySelector("form"));
    expect(window.location.pathname).toContain("/");
  });

  // it("adds movie on submit", () => {
  //   const addNewArticle = jest.fn();
  //   const user = { microsoft: { name: "Testy Testsen" } };
  //   const title = "Test Article";
  //   const intro = "Test Intro";
  //   const article = "Test Article";
  //   const category = "Test Category";
  //   const author = user.microsoft.name;
  //   const element = document.createElement("div");
  //   ReactDOM.render(
  //     <NewsApiContext.Provider value={{ addNewArticle }}>
  //       <MemoryRouter>
  //         <AddNewArticle user={user} />
  //       </MemoryRouter>
  //     </NewsApiContext.Provider>,
  //     element
  //   );
  //   act(() => {
  //     Simulate.change(element.querySelector(".form-input input"), {
  //       target: { value: title },
  //     });
  //   });
  //   act(() => {
  //     Simulate.change(
  //       element.querySelector(".form-input:nth-of-type(2) input"),
  //       {
  //         target: { value: intro },
  //       }
  //     );
  //   });
  //   act(() => {
  //     Simulate.change(
  //       element.querySelector(".form-input:nth-of-type(4) input"),
  //       {
  //         target: { value: article },
  //       }
  //     );
  //   });
  //   Simulate.submit(element.querySelector("form"));
  //   expect(addNewArticle).toBeCalledWith({
  //     title,
  //     intro,
  //     category,
  //     article,
  //     author,
  //   });
  // });
});
