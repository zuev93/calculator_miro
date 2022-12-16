import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Calculator from "./calculator";

ReactDOM.render(
    <StrictMode>
        <div>
            <label className="radiobutton">
                <input type="radio" name="mode" defaultChecked="defaultChecked"/>
                <span>Basic</span>
            </label>
            <label className="radiobutton"  title="Coming soon">
                <input type="radio" name="mode" disabled/>
                <span>Scientific (Coming soon)</span>
            </label>
            <label className="radiobutton"  title="Coming soon">
                <input type="radio" name="mode" disabled/>
                <span>Programmer (Coming soon)</span>
            </label>
        </div>
        <Calculator />
        <div className="footer">
            <span className="links">
                <a className="icon icon-help-question" href="https://github.com/zuev93/calculator_miro" target="_blank"></a>
                <a className="icon icon-comment-feedback" href="https://github.com/zuev93/calculator_miro/issues" target="_blank"></a>
            </span>
            <span>v0.1</span>
        </div>
    </StrictMode>,
    document.getElementById("root")
);