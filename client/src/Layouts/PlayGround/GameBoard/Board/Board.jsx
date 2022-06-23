import React, { useEffect, useState } from "react";
import "./Board.css";
import { socket } from "../../../../Services";

export default function Board() {
  // const [roomId, setRoomId] = useState('');
  // const [color, setColor] = useState('none');
  // const [data, setData] = useState({
  //   name: "",
  //   size: 5,
  //   differential: 0,
  //   thinkingTime: 60,
  //   minimumPiecesToLose: 0,
  //   pauseTime: 2,
  //   pausePeriod: 120,
  // });
  // const [board, setBoard] = useState([]);

  // console.log(dat);
  // const { color, roomId, data } = dat;
  // console.log( color, roomId, data );

  // let data = {
  //   name: "",
  //   size: 5,
  //   differential: 0,
  //   thinkingTime: 60,
  //   minimumPiecesToLose: 0,
  //   pauseTime: 2,
  //   pausePeriod: 120,
  // };

  const color = localStorage.getItem('color');
  const data = JSON.parse(localStorage.getItem('data'));
  console.log('get', data, color);
  let board = getBoard();

  let [prePos, setPrePos] = useState(-1);
  let turn = 'blue';

  const mapSize = 630;
  const tileSize = mapSize / data.size;

  const hold = (pos, className) => {
    if (pos === -1) return;
    const x = Math.floor(pos / data.size);
    const y = pos - x * data.size;
    console.log(x, y);
    if (
      x - 1 >= 0 &&
      document.getElementById((x - 1) * data.size + y).className !== "blue" &&
      document.getElementById((x - 1) * data.size + y).className !== "red"
    ) {
      document.getElementById((x - 1) * data.size + y).className = className;
    }
    if (
      x + 1 < data.size &&
      document.getElementById((x + 1) * data.size + y).className !== "blue" &&
      document.getElementById((x + 1) * data.size + y).className !== "red"
    ) {
      document.getElementById((x + 1) * data.size + y).className = className;
    }
    if (
      y - 1 >= 0 &&
      document.getElementById(x * data.size + (y - 1)).className !== "blue" &&
      document.getElementById(x * data.size + (y - 1)).className !== "red"
    ) {
      document.getElementById(x * data.size + (y - 1)).className = className;
    }
    if (
      y + 1 < data.size &&
      document.getElementById(x * data.size + (y + 1)).className !== "blue" &&
      document.getElementById(x * data.size + (y + 1)).className !== "red"
    ) {
      document.getElementById(x * data.size + (y + 1)).className = className;
    }
    if (pos % 2 === 0) {
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        document.getElementById((x - 1) * data.size + (y - 1)).className !==
          "blue" &&
        document.getElementById((x - 1) * data.size + (y - 1)).className !== "red"
      ) {
        document.getElementById((x - 1) * data.size + (y - 1)).className = className;
      }
      if (
        x + 1 < data.size &&
        y - 1 >= 0 &&
        document.getElementById((x + 1) * data.size + (y - 1)).className !==
          "blue" &&
        document.getElementById((x + 1) * data.size + (y - 1)).className !== "red"
      ) {
        document.getElementById((x + 1) * data.size + (y - 1)).className = className;
      }
      if (
        y + 1 < data.size &&
        x - 1 >= 0 &&
        document.getElementById((x - 1) * data.size + (y + 1)).className !==
          "blue" &&
        document.getElementById((x - 1) * data.size + (y + 1)).className !== "red"
      ) {
        document.getElementById((x - 1) * data.size + (y + 1)).className = className;
      }
      if (
        y + 1 < data.size &&
        x + 1 < data.size &&
        document.getElementById((x + 1) * data.size + (y + 1)).className !==
          "blue" &&
        document.getElementById((x + 1) * data.size + (y + 1)).className !== "red"
      ) {
        document.getElementById((x + 1) * data.size + (y + 1)).className = className;
      }
    }
  };

  const move = (from, to) => {
    const className = document.getElementById(from).className;
    if (className === "none") return;
    // console.log('move', from, to, className);
    document.getElementById(from).className = "none";
    let cl = "red";
    let cr = "blue";
    if (className === "blue") {
      cl = "blue";
      cr = "red";
    }
    document.getElementById(to).className = cl;

    const x = Math.floor(to / data.size);
    const y = to - x * data.size;

    /// ganh
    if (
      x - 1 >= 0 &&
      x + 1 < data.size &&
      document.getElementById((x - 1) * data.size + y).className === cr &&
      document.getElementById((x + 1) * data.size + y).className === cr
    ) {
      document.getElementById((x - 1) * data.size + y).className = cl;
      document.getElementById((x + 1) * data.size + y).className = cl;
    }
    if (
      y - 1 >= 0 &&
      y + 1 < data.size &&
      document.getElementById(x * data.size + (y - 1)).className === cr &&
      document.getElementById(x * data.size + (y + 1)).className === cr
    ) {
      document.getElementById(x * data.size + (y - 1)).className = cl;
      document.getElementById(x * data.size + (y + 1)).className = cl;
    }
    if (to % 2 === 0) {
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        x + 1 < data.size &&
        y + 1 < data.size &&
        document.getElementById((x - 1) * data.size + (y - 1)).className === cr &&
        document.getElementById((x + 1) * data.size + (y + 1)).className === cr
      ) {
        document.getElementById((x - 1) * data.size + (y - 1)).className = cl;
        document.getElementById((x + 1) * data.size + (y + 1)).className = cl;
      }
      if (
        y - 1 >= 0 &&
        x + 1 < data.size &&
        y + 1 < data.size &&
        x - 1 >= 0 &&
        document.getElementById((x + 1) * data.size + (y - 1)).className === cr &&
        document.getElementById((x - 1) * data.size + (y + 1)).className === cr
      ) {
        document.getElementById((x + 1) * data.size + (y - 1)).className = cl;
        document.getElementById((x - 1) * data.size + (y + 1)).className = cl;
      }
    }

    /// chet
    if (
      x - 2 >= 0 &&
      document.getElementById((x - 2) * data.size + y).className === cl &&
      document.getElementById((x - 1) * data.size + y).className === cr
    ) {
      document.getElementById((x - 1) * data.size + y).className = cl;
    }
    if (
      x + 2 < data.size &&
      document.getElementById((x + 2) * data.size + y).className === cl &&
      document.getElementById((x + 1) * data.size + y).className === cr
    ) {
      document.getElementById((x + 1) * data.size + y).className = cl;
    }
    if (
      y - 2 >= 0 &&
      document.getElementById(x * data.size + (y - 2)).className === cl &&
      document.getElementById(x * data.size + (y - 1)).className === cr
    ) {
      document.getElementById(x * data.size + (y - 1)).className = cl;
    }
    if (
      y + 2 < data.size &&
      document.getElementById(x * data.size + (y + 2)).className === cl &&
      document.getElementById(x * data.size + (y + 1)).className === cr
    ) {
      document.getElementById(x * data.size + (y + 1)).className = cl;
    }
    if (to % 2 === 0) {
      if (
        x - 2 >= 0 &&
        y - 2 >= 0 &&
        document.getElementById((x - 2) * data.size + (y - 2)).className === cl &&
        document.getElementById((x - 1) * data.size + (y - 1)).className === cr
      ) {
        document.getElementById((x - 1) * data.size + (y - 1)).className = cl;
      }
      if (
        x + 2 < data.size &&
        y + 2 < data.size &&
        document.getElementById((x + 2) * data.size + (y + 2)).className === cl &&
        document.getElementById((x + 1) * data.size + (y + 1)).className === cr
      ) {
        document.getElementById((x + 1) * data.size + (y + 1)).className = cl;
      }
      if (
        y - 2 >= 0 &&
        x + 2 < data.size &&
        document.getElementById((x + 2) * data.size + (y - 2)).className === cl &&
        document.getElementById((x + 1) * data.size + (y - 1)).className === cr
      ) {
        document.getElementById((x + 1) * data.size + (y - 1)).className = cl;
      }
      if (
        y + 2 < data.size &&
        x - 2 >= 0 &&
        document.getElementById((x - 2) * data.size + (y + 2)).className === cl &&
        document.getElementById((x - 1) * data.size + (y + 1)).className === cr
      ) {
        document.getElementById((x - 1) * data.size + (y + 1)).className = cl;
      }
    }
    if (turn === 'red') {
      turn = 'blue';
    } else {
      turn = 'red';
    }
    console.log('turn after move', turn);
  };

  useEffect(() => {
    socket.on('move', (data) => {
      console.log(data);
      move(Number(data.from), Number(data.to));
    })
  })

  const handleClick = (id) => {
    const className = document.getElementById(id).className;
    console.log('click', id, turn, color, className);
    // if ((className !== turn && className !== turn + "_hold") || turn !== color) return;

    hold(prePos, "none");
    if (id === prePos) {
      setPrePos(-1);
    } else if (className === "blue") {
      // if (turn === 'blue' && turn === color) {
        hold(id, "blue_hold");
        setPrePos(id);
      // }
    } else if (className === "red") {
      // if (turn === 'red' && turn === color)
      // {
        hold(id, "red_hold");
        setPrePos(id);
      // }
    } else {
      // console.log("move");
      // move(prePos, id);
      socket.emit("move", {
        id: socket.id,
        from: prePos,
        to: id,
      });
      setPrePos(-1);
    }
  };

  function getBoard() {
    let board = [];

    let del = 0;
    if (data.differential !== 0) {
      del = Math.round(data.differential / Math.abs(data.differential));
    }
    let l = del * Math.floor(Math.abs(data.differential) / 2);
    let r = del * Math.floor(Math.abs(data.differential) / 2);
    if (del > 0) {
      l = l + (data.differential % 2);
    } else {
      r = r + (data.differential % 2);
    }
    // console.log(l, r);

    for (let j = 0; j < data.size; j++) {
      for (let i = 0; i < data.size; i++) {
        const number = j * data.size + i;
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
          } else if (i === data.size - 1) {
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
        } else if (j === data.size - 1) {
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
          } else if (i === data.size - 1) {
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
            if (j < data.size / 2 + r) {
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
          } else if (i === data.size - 1) {
            if (j < data.size / 2 - 1 + l) {
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
            if (j < data.size / 2 + r) {
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
          } else if (i === data.size - 1) {
            if (j < data.size / 2 - 1 + l) {
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

    return board;
  }

  return (
    <div id="block_container">
      <div
        id="board"
        style={{
          height: `${mapSize}px`,
          width: `${mapSize}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${data.size}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${data.size}, ${tileSize}px)`,
        }}
      >
        {board}
      </div>
      {/* <div>
        <div>
          <button id="blue_turn" className="active">{b1}</button>
        </div>
        <div>
          <button id="red_turn" className="not_active">{b2}</button>
        </div>
      </div> */}
    </div>
  );
}
