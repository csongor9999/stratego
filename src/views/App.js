import React, { useState } from 'react';
import "../styles/main.css"
import "../styles/maincontent.css"
import Lobby from './lobby/Lobby';
import Join from './join/Join';
import MainPage from './mainpage/MainPage';
import Prepare from './prepare/Prepare';
import InGame from './ingame/InGame';
import Wait from './wait/Wait';

function App() {

  const gameStateEnum = {
    MAIN_PAGE: "mainPage",
    JOIN_GAME: "joinGame",
    WAITING_FOR_SECOND_PLAYER: "waitingForSecondPlayer",
    PREPARE_GAME: "prepareGame",
    IN_GAME: "inGame",
    WAIT_OTHER_PLAYER: "waitOtherPlayer"
  }

  const [gameState, setGameState] = useState(gameStateEnum.MAIN_PAGE);
  const [gameBoardSizeX, setGameBoardSizeX] = useState(6);
  const [gameBoardSizeY, setGameBoardSizeY] = useState(6);
  const [gameInventorySizeX, setGameInventorySizeX] = useState(6);
  const [gameInventorySizeY, setGameInventorySizeY] = useState(6);
  const [player,setPlayer] = useState(-1);
  const [roomId,setRoomId] = useState('');



  const handleGameState = newState => {
    setGameState(newState);
  }


  switch (gameState) {
    case "mainPage":
      return <MainPage gameStateEnum={gameStateEnum} onSelect={handleGameState} />
    case "waitingForSecondPlayer":
      return <Lobby gameStateEnum={gameStateEnum} onSelect={handleGameState} setPlayer={setPlayer} setRoomId={setRoomId} roomId={roomId}/>
    case "joinGame":
      return <Join gameStateEnum={gameStateEnum} onSelect={handleGameState} setPlayer={setPlayer} setRoomId={setRoomId}/>
    case "prepareGame":
      return <Prepare gameStateEnum={gameStateEnum} onSelect={handleGameState}  gameBoardSizeX={gameBoardSizeX} gameBoardSizeY={gameBoardSizeY} gameInventorySizeX={gameInventorySizeX} gameInventorySizeY={gameInventorySizeY} roomId={roomId} player={player}/>
    case "inGame":
      return <InGame gameStateEnum={gameStateEnum} onSelect={handleGameState} gameBoardSizeX={gameBoardSizeX} gameBoardSizeY={gameBoardSizeY} player={player} roomId={roomId}/>
      case "waitOtherPlayer":
        return <Wait gameStateEnum={gameStateEnum} onSelect={handleGameState} gameBoardSizeX={gameBoardSizeX} gameBoardSizeY={gameBoardSizeY} player={player} roomId={roomId}/>
    default:
      break;
  }
}

export default App;
