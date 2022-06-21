import React, {Fragment} from 'react';
import Board from './Board/Board';

export default function GameBoard(data) {
  return (
    <Fragment>
      <Board {...data}/>
    </Fragment>
  );
}