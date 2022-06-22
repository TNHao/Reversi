import React, { Fragment, useState, useEffect } from 'react';
import { socket } from '../../../Services';
import Board from './Board/Board';

export default function GameBoard() {

  // const [isReady, setReady] = useState(false);
  // const [isStart, setStart] = useState(false);

  // let data = {};
  // let a = [];

  // useEffect(() => {
  //   socket.on('room.start', (dat) => {
  //     data = {
  //       color: dat.color,
  //       roomId: dat.roomId,
  //       data: dat.data,
  //     };
  //     a.push(1);
  //     console.log(data);
  //     setStart(true);
  //   });
  // }, []);

  // if (!isReady) {
  //   console.log(isReady);
  //   socket.emit('room.ready', {id: socket.id});
  //   setReady(true);
  // }

  return (
    <Fragment>
      <Board/>
      {/* {
        isStart
        ?
        a.map((e) => {
          return <Board {...data}/>
        })
        :
        <div/>
      } */}
    </Fragment>
  );
}