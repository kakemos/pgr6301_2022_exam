import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {AddNewArticle} from "../pages/news/addNewArticle";
import React from "react";
import {Profile} from "../pages/login/profile";

describe("profile component", () => {
  it("shows microsoft user profile", () => {
      const element = document.createElement("div");
      const user = { microsoft: { name: "Testy Testsen", email: "testy@test.com" } };

    ReactDOM.render(
        <MemoryRouter>
          <Profile user={user} />
        </MemoryRouter>,
        element
    );

    expect(element.querySelector("h1").innerHTML).toEqual("Profile for Testy Testsen");
    expect(element.querySelector("h3").innerHTML).toEqual("testy@test.com");
    expect(element.innerHTML).toMatchSnapshot();

  });

  it("shows google user profile", () => {
          const element = document.createElement("div");
          const user = { google: { name: "Testy Testsen", email: "testy@test.com" } };

          ReactDOM.render(
              <MemoryRouter>
                  <Profile user={user} />
              </MemoryRouter>,
              element
          );

          expect(element.querySelector("h1").innerHTML).toEqual("Profile for Testy Testsen");
          expect(element.querySelector("h3").innerHTML).toEqual("testy@test.com");
          expect(element.innerHTML).toMatchSnapshot();
  });
});
