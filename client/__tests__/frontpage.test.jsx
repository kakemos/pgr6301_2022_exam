import {BrowserRouter} from "react-router-dom";
import {FrontPage} from "../pages/frontpage/frontPage";
import ReactDOM from "react-dom";
import React from "react";

describe("front page component", () => {
    it("shows headline", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <FrontPage/>
            </BrowserRouter>,
            domElement);
        expect(domElement.querySelector("#frontpage-title").innerHTML).toEqual("Everyday News!")
        expect(domElement.innerHTML).toMatchSnapshot();
    })
})