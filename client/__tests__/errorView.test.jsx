import React from "react";
import ReactDOM from "react-dom";
import {ErrorDuplicateTitle} from "../pages/error/errorDuplicateTitle";
import {BrowserRouter} from "react-router-dom";
import {ErrorEmptyFields} from "../pages/error/errorEmptyFields";

describe ("error view", () => {
    it("shows duplicate error message", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <ErrorDuplicateTitle/>
            </BrowserRouter>,
            domElement);
        expect(domElement.querySelector("#duplicate-error").innerHTML).toEqual("That title already exists.")
    })

    it("shows empty fields error message", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <ErrorEmptyFields/>
            </BrowserRouter>,
            domElement);
        expect(domElement.querySelector("#empty-fields-error").innerHTML).toEqual("You need to fill in all the fields!")
    })
})