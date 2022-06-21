import React, { useEffect, useState } from "react";
import "./Board.css";
import { socket } from "../../../../Services";

export default function Board(data) {
  const { size, diffNumChess, color } = data;

  console.log(size, diffNumChess, color);
  // const size = 7;
  const mapSize = 630;
  const tileSize = mapSize / size;

  let del = 0;
  if (diffNumChess !== 0) {
    del = Math.round(diffNumChess / Math.abs(diffNumChess));
  }
  let l = del * Math.floor(Math.abs(diffNumChess) / 2);
  let r = del * Math.floor(Math.abs(diffNumChess) / 2);
  if (del > 0) {
    l = l + (diffNumChess % 2);
  } else {
    r = r + (diffNumChess % 2);
  }
  console.log(l, r);

  const [prePos, setPrePos] = useState(-1);
  const [turn, setTurn] = useState(color);

  let board = [];

  useEffect(() => {
    socket.on("on-text-change", (data) => {
      console.log(data);
    });
  }, []);

  const hold = (pos, className) => {
    if (pos === -1) return;
    const x = Math.floor(pos / size);
    const y = pos - x * size;
    console.log(x, y);
    if (
      x - 1 >= 0 &&
      document.getElementById((x - 1) * size + y).className !== "blue" &&
      document.getElementById((x - 1) * size + y).className !== "red"
    ) {
      document.getElementById((x - 1) * size + y).className = className;
    }
    if (
      x + 1 < size &&
      document.getElementById((x + 1) * size + y).className !== "blue" &&
      document.getElementById((x + 1) * size + y).className !== "red"
    ) {
      document.getElementById((x + 1) * size + y).className = className;
    }
    if (
      y - 1 >= 0 &&
      document.getElementById(x * size + (y - 1)).className !== "blue" &&
      document.getElementById(x * size + (y - 1)).className !== "red"
    ) {
      document.getElementById(x * size + (y - 1)).className = className;
    }
    if (
      y + 1 < size &&
      document.getElementById(x * size + (y + 1)).className !== "blue" &&
      document.getElementById(x * size + (y + 1)).className !== "red"
    ) {
      document.getElementById(x * size + (y + 1)).className = className;
    }
    if (pos % 2 === 0) {
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        document.getElementById((x - 1) * size + (y - 1)).className !==
          "blue" &&
        document.getElementById((x - 1) * size + (y - 1)).className !== "red"
      ) {
        document.getElementById((x - 1) * size + (y - 1)).className = className;
      }
      if (
        x + 1 < size &&
        y - 1 >= 0 &&
        document.getElementById((x + 1) * size + (y - 1)).className !==
          "blue" &&
        document.getElementById((x + 1) * size + (y - 1)).className !== "red"
      ) {
        document.getElementById((x + 1) * size + (y - 1)).className = className;
      }
      if (
        y + 1 < size &&
        x - 1 >= 0 &&
        document.getElementById((x - 1) * size + (y + 1)).className !==
          "blue" &&
        document.getElementById((x - 1) * size + (y + 1)).className !== "red"
      ) {
        document.getElementById((x - 1) * size + (y + 1)).className = className;
      }
      if (
        y + 1 < size &&
        x + 1 < size &&
        document.getElementById((x + 1) * size + (y + 1)).className !==
          "blue" &&
        document.getElementById((x + 1) * size + (y + 1)).className !== "red"
      ) {
        document.getElementById((x + 1) * size + (y + 1)).className = className;
      }
    }
  };

  const move = (from, to, className) => {
    hold(from, "none");
    document.getElementById(from).className = "none";
    let cl = "red";
    let cr = "blue";
    if (className === "blue_hold") {
      cl = "blue";
      cr = "red";
    }
    document.getElementById(to).className = cl;

    const x = Math.floor(to / size);
    const y = to - x * size;

    /// ganh
    if (
      x - 1 >= 0 &&
      x + 1 < size &&
      document.getElementById((x - 1) * size + y).className === cr &&
      document.getElementById((x + 1) * size + y).className === cr
    ) {
      document.getElementById((x - 1) * size + y).className = cl;
      document.getElementById((x + 1) * size + y).className = cl;
    }
    if (
      y - 1 >= 0 &&
      y + 1 < size &&
      document.getElementById(x * size + (y - 1)).className === cr &&
      document.getElementById(x * size + (y + 1)).className === cr
    ) {
      document.getElementById(x * size + (y - 1)).className = cl;
      document.getElementById(x * size + (y + 1)).className = cl;
    }
    if (to % 2 === 0) {
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        x + 1 < size &&
        y + 1 < size &&
        document.getElementById((x - 1) * size + (y - 1)).className === cr &&
        document.getElementById((x + 1) * size + (y + 1)).className === cr
      ) {
        document.getElementById((x - 1) * size + (y - 1)).className = cl;
        document.getElementById((x + 1) * size + (y + 1)).className = cl;
      }
      if (
        y - 1 >= 0 &&
        x + 1 < size &&
        y + 1 < size &&
        x - 1 >= 0 &&
        document.getElementById((x + 1) * size + (y - 1)).className === cr &&
        document.getElementById((x - 1) * size + (y + 1)).className === cr
      ) {
        document.getElementById((x + 1) * size + (y - 1)).className = cl;
        document.getElementById((x - 1) * size + (y + 1)).className = cl;
      }
    }

    /// chet
    if (
      x - 2 >= 0 &&
      document.getElementById((x - 2) * size + y).className === cl &&
      document.getElementById((x - 1) * size + y).className === cr
    ) {
      document.getElementById((x - 1) * size + y).className = cl;
    }
    if (
      x + 2 < size &&
      document.getElementById((x + 2) * size + y).className === cl &&
      document.getElementById((x + 1) * size + y).className === cr
    ) {
      document.getElementById((x + 1) * size + y).className = cl;
    }
    if (
      y - 2 >= 0 &&
      document.getElementById(x * size + (y - 2)).className === cl &&
      document.getElementById(x * size + (y - 1)).className === cr
    ) {
      document.getElementById(x * size + (y - 1)).className = cl;
    }
    if (
      y + 2 < size &&
      document.getElementById(x * size + (y + 2)).className === cl &&
      document.getElementById(x * size + (y + 1)).className === cr
    ) {
      document.getElementById(x * size + (y + 1)).className = cl;
    }
    if (to % 2 === 0) {
      if (
        x - 2 >= 0 &&
        y - 2 >= 0 &&
        document.getElementById((x - 2) * size + (y - 2)).className === cl &&
        document.getElementById((x - 1) * size + (y - 1)).className === cr
      ) {
        document.getElementById((x - 1) * size + (y - 1)).className = cl;
      }
      if (
        x + 2 < size &&
        y + 2 < size &&
        document.getElementById((x + 2) * size + (y + 2)).className === cl &&
        document.getElementById((x + 1) * size + (y + 1)).className === cr
      ) {
        document.getElementById((x + 1) * size + (y + 1)).className = cl;
      }
      if (
        y - 2 >= 0 &&
        x + 2 < size &&
        document.getElementById((x + 2) * size + (y - 2)).className === cl &&
        document.getElementById((x + 1) * size + (y - 1)).className === cr
      ) {
        document.getElementById((x + 1) * size + (y - 1)).className = cl;
      }
      if (
        y + 2 < size &&
        x - 2 >= 0 &&
        document.getElementById((x - 2) * size + (y + 2)).className === cl &&
        document.getElementById((x - 1) * size + (y + 1)).className === cr
      ) {
        document.getElementById((x - 1) * size + (y + 1)).className = cl;
      }
    }
  };

  const handleClick = (id) => {
    console.log(id);
    const className = document.getElementById(id).className;
    if ((className !== turn && className !== turn + "_hold") || turn !== color) return;

    if (id === prePos) {
      hold(prePos, "none");
      setPrePos(-1);
    } else if (className === "blue") {
      hold(prePos, "none");
      hold(id, "blue_hold");
      setPrePos(id);
    } else if (className === "red") {
      hold(prePos, "none");
      hold(id, "red_hold");
      setPrePos(id);
    } else {
      console.log("move");
      move(prePos, id, className);
      socket.emit("move", {
        id: socket.id,
        from: prePos,
        to: id,
      });
      setPrePos(-1);
      if (turn === "red") {
        setTurn("blue");
      } else {
        setTurn("red");
      }
    }
  };

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      const number = j * size + i;
      // console.log("tile_" + number)
      if (j === 0) {
        if (i === 0) {
          board.push(
            <div className="tile1">
              <button
                id={number}
                className="blue"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else if (i === size - 1) {
          board.push(
            <div className="tile4">
              <button
                id={number}
                className="blue"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else if (i % 2 === 0) {
          board.push(
            <div className="tile13">
              <button
                id={number}
                className="blue"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else {
          board.push(
            <div className="tile5">
              <button
                id={number}
                className="blue"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        }
      } else if (j === size - 1) {
        if (i === 0) {
          board.push(
            <div className="tile2">
              <button
                id={number}
                className="red"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else if (i === size - 1) {
          board.push(
            <div className="tile3">
              <button
                id={number}
                className="red"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else if (i % 2 === 0) {
          board.push(
            <div className="tile11">
              <button
                id={number}
                className="red"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else {
          board.push(
            <div className="tile6">
              <button
                id={number}
                className="red"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        }
      } else if (j % 2 === 0) {
        if (i === 0) {
          if (j < size / 2 + r) {
            board.push(
              <div className="tile12">
                <button
                  id={number}
                  className="blue"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          } else {
            board.push(
              <div className="tile12">
                <button
                  id={number}
                  className="red"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          }
        } else if (i === size - 1) {
          if (j < size / 2 - 1 + l) {
            board.push(
              <div className="tile14">
                <button
                  id={number}
                  className="blue"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          } else {
            board.push(
              <div className="tile14">
                <button
                  id={number}
                  className="red"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          }
        } else if (i % 2 === 0) {
          board.push(
            <div className="tile10">
              <button
                id={number}
                className="none"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else {
          board.push(
            <div className="tile9">
              <button
                id={number}
                className="none"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        }
      } else {
        if (i === 0) {
          if (j < size / 2 + r) {
            board.push(
              <div className="tile8">
                <button
                  id={number}
                  className="blue"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          } else {
            board.push(
              <div className="tile8">
                <button
                  id={number}
                  className="red"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          }
        } else if (i === size - 1) {
          if (j < size / 2 - 1 + l) {
            board.push(
              <div className="tile7">
                <button
                  id={number}
                  className="blue"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          } else {
            board.push(
              <div className="tile7">
                <button
                  id={number}
                  className="red"
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                />
              </div>
            );
          }
        } else if (i % 2 === 0) {
          board.push(
            <div className="tile9">
              <button
                id={number}
                className="none"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        } else {
          board.push(
            <div className="tile10">
              <button
                id={number}
                className="none"
                onClick={(e) => {
                  handleClick(e.target.id);
                }}
              />
            </div>
          );
        }
      }
    }
  }

  return (
    <div
      id="board"
      style={{
        height: `${mapSize}px`,
        width: `${mapSize}px`,
        display: "grid",
        gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
      }}
    >
      {board}
    </div>
  );
}
