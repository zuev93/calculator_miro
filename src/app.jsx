import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Calculator from "./calculator";

ReactDOM.render(
    <StrictMode>
        <div>
            <input type="radio" name="mode" value="basic" defaultChecked="defaultChecked"/>
            <label htmlFor="basic">Basic</label>
            <input type="radio" name="mode" value="scientific" disabled/>
            <label htmlFor="scientific" title="Coming soon">Scientific</label>
            <input type="radio" name="mode" value="programmer" disabled/>
            <label htmlFor="programmer" title="Coming soon">Programmer</label>
        </div>
        <Calculator />
        <div className="footer">
            <span>v0.1</span>
            <a href="https://github.com/zuev93/calculator_miro" target="_blank">About</a>
            <a href="https://github.com/zuev93/calculator_miro/issues" target="_blank">Give feedback</a>
        </div>
    </StrictMode>,
    document.getElementById("root")
);