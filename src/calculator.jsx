import React, { useState } from "react";

import Screen from "./components/Screen";
import Button from "./components/Button";
import "./calculator.css";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];


const math = (a, b, sign) =>
    sign === "+" ? a + b : sign === "-" ? a - b : (sign === "X" || sign === "*") ? a * b : a / b;

const Calculator = () => {
    const keyHandler = (e) => {
        e.preventDefault();
        const value = e.key;
        if (value === "+" || value === "-" || value === "*" || value === "/") {
            processSign(value);
        } else if (value === "%") {
            percentClickHandler();
        } else if (value === "Enter") {
            equalsClickHandler();
        } else if (value === "Escape") {
            resetClickHandler();
        } else if (value === "." || value === ",") {
            processComma(value);
        } else if (!isNaN(value)){
            processNum(value);
        }
    };

    let [calc, setCalc] = useState({
        sign: "",
        num: null,
        res: 0,
    });

    const processNum = (value) => {
        if (calc.num?.length ?? 0 < 16) {
            setCalc({
                ...calc,
                num: Number((calc.num ?? "") + value)
            });
        }
    };

    const processSign = (sign) => {
        setCalc({
            ...calc,
            sign: sign,
            res:  calc.res ? math(Number(calc.res), Number(calc.num), calc.sign) : (calc.num ?? calc.prevNum),
            num: null
        });
    };

    const processComma = (comma) => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num,
        });
    };

    const numClickHandler = (e) => {
        e.preventDefault();
        processNum(e.target.innerHTML);
    };

    const comaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        processComma(value);
    };

    const signClickHandler = (e) => {
        processSign(e.target.innerHTML);
    };

    const equalsClickHandler = () => {
        if (calc.sign && (calc.num || calc.prevNum)) {
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/" && calc.prevNum === null
                        ? "Can't divide with 0"
                        : math(calc.res, calc.num ?? calc.prevNum, calc.sign),
                sign: calc.sign,
                num: null,
                prevNum: calc.num ?? calc.prevNum
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? calc.num * -1 : calc.num,
            res: !calc.num && calc.res ? calc.res * -1 : calc.res,
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ?? 0
        num /= Math.pow(100, 1);
        let res = calc.res ?? 0;
        if (calc.sign === "+" || calc.sign === "-") {
            num *= res;
        }
        setCalc({
            ...calc,
            num: num,
            res: res,
            sign: calc.sign,
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <div className="wrapper" onKeyDown={keyHandler} tabIndex="0">
            <Screen value={calc.num ? calc.num : calc.res} />
            <div className="buttonBox">
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className={btn === "=" ? "equals" : ""}
                            value={btn}
                            onClick={
                                btn === "C"
                                    ? resetClickHandler
                                    : btn === "+-"
                                        ? invertClickHandler
                                        : btn === "%"
                                            ? percentClickHandler
                                            : btn === "="
                                                ? equalsClickHandler
                                                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                                    ? signClickHandler
                                                    : btn === "."
                                                        ? comaClickHandler
                                                        : numClickHandler
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Calculator;