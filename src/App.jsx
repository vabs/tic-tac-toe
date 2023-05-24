import { useState } from "react";
import "./App.css";

function App() {
  const [currentValue, setCurrentValue] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentState, setCurrentState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const onClick = (e) => {
    if (
      currentState[e.target.dataset.row][e.target.dataset.col] !== "" ||
      isGameOver
    ) {
      return;
    }
    const tempState = currentState;
    tempState[e.target.dataset.row][e.target.dataset.col] = currentValue;
    setCurrentState(tempState);

    const done = gameOver();
    if (done) {
      setIsGameOver(true);
      return;
    }

    setCurrentValue(currentValue === "X" ? "O" : "X");
  };

  const resetGameClick = (e) => {
    setCurrentState([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setIsGameOver(false);
  };

  const gameOver = () => {
    // check row
    for (let row = 0; row < currentState.length; row++) {
      if (
        currentState[row][0] !== "" &&
        currentState[row][0] === currentState[row][1] &&
        currentState[row][1] === currentState[row][2]
      ) {
        return true;
      }
    }

    // check column
    for (let row = 0; row < currentState.length; row++) {
      if (
        currentState[0][row] !== "" &&
        currentState[0][row] === currentState[1][row] &&
        currentState[1][row] === currentState[2][row]
      ) {
        return true;
      }
    }

    // check diagonal
    if (
      (currentState[0][0] !== "" &&
        currentState[0][0] === currentState[1][1] &&
        currentState[1][1] === currentState[2][2]) ||
      (currentState[2][0] !== "" &&
        currentState[2][0] === currentState[1][1] &&
        currentState[1][1] === currentState[0][2])
    )
      return true;

    return false;
  };

  return (
    <>
      {isGameOver && <button onClick={resetGameClick}>Reset</button>}
      <p>
        {isGameOver ? "Winner: " : "Current Value: "} {currentValue}{" "}
      </p>
      {currentState.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((value, colIdx) => {
              return (
                <div
                  className={`square ${value !== "" ? "disabled" : ""}`}
                  key={`${rowIdx}-${colIdx}`}
                  data-row={rowIdx}
                  data-col={colIdx}
                  onClick={onClick}
                >
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
