import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: any) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: any) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl font-bold mb-4">Calculator</h1>
      <div id="calculator" className="w-72 mx-auto bg-gray-100 border border-gray-300 p-4 rounded-lg">
        <div id="display" className="text-right mb-4">
          <div id="answer" className="text-base mb-2">{answer}</div>
          <div id="expression" className="text-base mb-2">{expression}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("percentage")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            3
          </button>
          <button
            id="add"
            onClick={() => buttonPress("+")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
          >
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg col-span-2"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
