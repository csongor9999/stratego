import React, { useState } from 'react';
import BoardTo from './BoardTo';
import "../../styles/main.css";
import "../../styles/prepare.css";
import { useSelector, useDispatch } from 'react-redux';
import { getInventory } from '../../state/inventory/selectors';
import { getGameBoard } from '../../state/gametable/selectors';
import { addGameTable, removeGameTable } from '../../state/gametable/actions';
import { removeInventory, addInventory } from '../../state/inventory/actions';
import { addReady } from '../../state/ready/actions';
import {socket} from '../../state/socket'

function Prepare({ gameStateEnum, onSelect, gameBoardSizeX, gameBoardSizeY, gameInventorySizeX, gameInventorySizeY, roomId, player}) {

  const gameBoard = {
    'grid': Array(gameBoardSizeX).fill().map(x => Array(gameBoardSizeY).fill({data:'',x:'',y:'',yours:'',showPath:''})),
  };

  const gameInventory = {
    'grid': Array(gameInventorySizeX).fill().map(x => Array(gameInventorySizeY).fill({data:'',x:'',y:'',yours:'',showPath:''})),
  };

  const inventory = useSelector(getInventory)
  const board = useSelector(getGameBoard)
  const [selectedX, setSelectedX] = useState(-1);
  const [selectedY, setSelectedY] = useState(-1);
  const [where, setWhere] = useState("");
  const dispatch = useDispatch();

    for(let i=0;i<=gameInventory.grid.length;i++) {
      for(let j=0;j<=gameInventory.grid.length;j++) {
        for(let k=0;k<inventory.length;k++) {
          if(i === inventory[k].x && j === inventory[k].y ) {
            gameInventory.grid[i][j] = inventory[k];
            gameInventory.grid[i][j].yours = player;
            if(player === 1) {
              gameInventory.grid[i][j].data.id+=20;
            }
          }
        }
      }
    }

    for(let i=0;i<=gameBoard.grid.length;i++) {
      for(let j=0;j<=gameBoard.grid.length;j++) {
        for(let k=0;k<board.length;k++) {
          if(i === board[k].x && j === board[k].y ) {
            gameBoard.grid[i][j] = board[k];
          }
        }
      }
    }

  let firstSelected = "";


  function boardClickHandler(g,x,y,active,where) {
    if(firstSelected === "" && g[x][y].data!=="" && ((x>=gameInventorySizeX-2 && player === 0) || (x<2 && player === 1))) {
      firstSelected = g[x][y];
      setWhere("gameBoard");
      setSelectedX(x);
      setSelectedY(y);
    } else if(firstSelected !== "" && ((x>=gameInventorySizeX-2 && player === 0) || (x<2 && player === 1)) && g[x][y].data==="" && where === 'inventory') {
      let newCopy = JSON.stringify(firstSelected);
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      dispatch(removeInventory(firstSelected));
      socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
      firstSelected = "";
      setWhere("");
    } else if(firstSelected !== "" && ((x>=gameInventorySizeX-2 && player === 0) || (x<2 && player === 1)) && g[x][y].data==="" && where === 'gameBoard') {
      let newCopy = JSON.stringify(firstSelected);
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
      socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
      firstSelected = "";
    } else if(g[x][y].data!=="" && ((x>=gameInventorySizeX-2 && player === 0) || (x<2 && player === 1))) {
      if(firstSelected.data.id !== g[x][y].data.id) {
        firstSelected = g[x][y];
        setSelectedX(x);
        setSelectedY(y);
        setWhere("gameBoard");
      } else {
        setSelectedX(-1);
        setSelectedY(-1);
        setWhere("");
        firstSelected = "";
      }
    } else {
      firstSelected = "";
      setWhere("");
    }
  }


  function inventoryClickHandler(g,x,y,active,where) {
    if(firstSelected === "" && g[x][y].data!=="") {
    firstSelected = g[x][y];
    setSelectedX(x);
    setSelectedY(y);
    setWhere("inventory");
    } else if(firstSelected !== "" && where === 'inventory' && g[x][y].data==="") {
      let newCopy = JSON.stringify(firstSelected);
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      dispatch(removeInventory(firstSelected));
      dispatch(addInventory(newCopy));
      firstSelected = "";
      setWhere("");
    } else if(firstSelected !== "" && where === 'gameBoard' && g[x][y].data==="") {
      let newCopy = JSON.stringify(firstSelected);
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      dispatch(addInventory(newCopy));
      socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
      firstSelected = "";
      setWhere("");
    } else if(g[x][y].data!=="") {
      if(firstSelected.data.id !== g[x][y].data.id) {
        firstSelected = g[x][y];
        setSelectedX(x);
        setSelectedY(y);
        setWhere("inventory");
      } else {
        setSelectedX(-1);
        setSelectedY(-1);
        setWhere("");
        firstSelected = "";
      }
    } else {
      firstSelected = "";
      setWhere("");
    }
  }

  function goWait() {
    socket.emit('sync-action',roomId,addReady(1),false,ack => {});
    onSelect(gameStateEnum.WAIT_OTHER_PLAYER);
  }



  return (
    <div className="wrapper fadeInDown">
      <div id="prepareContent" className="col-md-12 col-lg-12">

        <div className="fadeIn first">
          <h2 className="fadeIn second">Tervezd meg a felállást!</h2>
          <h3 className="fadeIn second">Csak olyan mezőre lehet bábut rakni, amilyen színű az!</h3>
        </div>

        <hr className="fadeIn third"></hr>
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="col-md-6 col-lg-6 fadeIn third ">
            <h2 className="fadeIn third">Játéktábla</h2>
              <BoardTo className="inventory" type={"gameBoard"} sizeX={gameBoardSizeY} data={gameBoard} selectedX={selectedX} selectedY={selectedY} where={where}   onClick={boardClickHandler} activePlayer={player} player={player} />
            </div>
          </div>
          <div className="col-auto">
            <div className="col-md-6 col-lg-6 fadeIn third">
            <h2 className="fadeIn third">Inventory</h2>
            <BoardTo className="inventory" type={"inventory"} sizeX={gameBoardSizeY} selectedX={selectedX} selectedY={selectedY} where={where}  data={gameInventory} onClick={inventoryClickHandler} activePlayer={player} player={player}/>
            </div>
          </div>
        </div>
        <button className="fadeIn third" onClick={() => onSelect(gameStateEnum.MAIN_PAGE)}>Vissza a menübe</button>
        <button className="fadeIn third" /*disabled={inventory.length!==0}*/ onClick={() => goWait()}>Kész</button>

        <div id="mainFooter">
          <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}



export default Prepare;