import React, { useState } from 'react';
import "../../styles/main.css"
import "../../styles/prepare.css"
import BoardTo from '../prepare/BoardTo';
import { useSelector, useDispatch } from 'react-redux';
import { getGameBoard } from '../../state/gametable/selectors';
import { addGameTable, removeGameTable } from '../../state/gametable/actions';
import { getLeftHand } from '../../state/leftHand/selectors';
import { addLeftHand } from '../../state/leftHand/actions';
import { getRightHand } from '../../state/rightHand/selectors';
import { getPlayer } from '../../state/player/selectors';
import { addRightHand } from '../../state/rightHand/actions';
import { changePlayer } from '../../state/player/actions';
import { getMessage } from '../../state/message/selectors';
import { changeMessage } from '../../state/message/actions';
import { getEndGame } from '../../state/endGame/selectors';
import { changeEndGame } from '../../state/endGame/actions';
import {socket} from '../../state/socket'

function InGame({ gameStateEnum, onSelect, gameBoardSizeX, gameBoardSizeY, player, roomId }) {



  const otherPlayer = player === 1 ? 0 : 1;


  const gameBoard = {
    'grid': Array(gameBoardSizeX).fill().map(x => Array(gameBoardSizeY).fill({data:'',x:'',y:'',yours:'',showPath:''})),
  };

  const firstPlayerHand = {
    'grid': Array(10).fill().map(x => Array(1).fill({data:'',x:'',y:'',yours:'',showPath:''})),
  };

  const secondPlayerHand = {
    'grid': Array(10).fill().map(x => Array(1).fill({data:'',x:'',y:'',yours:'',showPath:''})),
  };

  const [selectedX, setSelectedX] = useState(-1);
  const [selectedY, setSelectedY] = useState(-1);

  //Ha activePlayer = 1, akkor a tábla alsó részén lévő bábukkal lehet lépni [yours = true]

  const leftHand = useSelector(getLeftHand)
  const rightHand = useSelector(getRightHand)
  const board = useSelector(getGameBoard)
  const activePlayer = useSelector(getPlayer);
  const message = useSelector(getMessage);
  const endgame = useSelector(getEndGame);
  const dispatch = useDispatch()

  //Gameboard adatok
  for(let i=0;i<=gameBoard.grid.length;i++) {
    for(let j=0;j<=gameBoard.grid.length;j++) {
      for(let k=0;k<board.length;k++) {
        if(i === board[k].x && j === board[k].y ) {
          gameBoard.grid[i][j] = board[k];
        }
      }
    }
  }

  //LeftHand adatok
  let k = 0;
  for(let i=0;i<10;i++) {
    for(let j=0;j<1;j++) {
       if(k<leftHand.length) {
        firstPlayerHand.grid[i][j] = leftHand[k];
        k++;
       }
      }
  }

  //RightHand adatok
  let l = 0;
  for(let i=0;i<10;i++) {
    for(let j=0;j<1;j++) {
       if(l<rightHand.length) {
        secondPlayerHand.grid[i][j] = rightHand[l];
        l++;
       }
      }
  }

  let firstSelected = "";

  function showPath(g,x,y,active) {
    if(g[x][y].data.name!=="2") {
      if(x-1>=0 && (g[x-1][y].data === "" || (active === player && g[x-1][y].yours === otherPlayer))) {
        let newCopy = JSON.stringify(g[x-1][y]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x-1;
        newCopy.y = y;
        dispatch(addGameTable(newCopy));
      } 
      if(x+1<gameBoard.grid.length && (g[x+1][y].data === "" || (active === player && g[x+1][y].yours === otherPlayer))) {
        let newCopy = JSON.stringify(g[x+1][y]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x+1;
        newCopy.y = y;
        dispatch(addGameTable(newCopy));
      }
      if(y-1>=0 && (g[x][y-1].data === "" || (active === player && g[x][y-1].yours === otherPlayer))) {
        let newCopy = JSON.stringify(g[x][y-1]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x;
        newCopy.y = y-1;
        dispatch(addGameTable(newCopy));
      }
      if(y+1<gameBoard.grid.length && (g[x][y+1].data === "" || (active === player && g[x][y+1].yours === otherPlayer))) {
        let newCopy = JSON.stringify(g[x][y+1]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x;
        newCopy.y = y+1;
        dispatch(addGameTable(newCopy));
      }
    } else {
      let startPoint = x;
      while(startPoint>=0) {
        if(active !== g[startPoint][y].yours) {
        let newCopy = JSON.stringify(g[startPoint][y]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = startPoint;
        newCopy.y = y;
        dispatch(addGameTable(newCopy));
        }
        startPoint--;
      }

      startPoint = x;
      while(startPoint<gameBoard.grid.length) {
        if(active !== g[startPoint][y].yours) {
        let newCopy = JSON.stringify(g[startPoint][y]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = startPoint;
        newCopy.y = y;
        dispatch(addGameTable(newCopy));
        }
        startPoint++;
      }

      startPoint = y;
      while(startPoint>=0) {
        if(active !== g[x][startPoint].yours) {
        let newCopy = JSON.stringify(g[x][startPoint]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x;
        newCopy.y = startPoint;
        dispatch(addGameTable(newCopy));
        }
        startPoint--;
      }

      startPoint = y;
      while(startPoint<gameBoard.grid.length) {
        if(active !== g[x][startPoint].yours) {
        let newCopy = JSON.stringify(g[x][startPoint]);
        newCopy = JSON.parse(newCopy);
        newCopy.showPath = true;
        newCopy.x = x;
        newCopy.y = startPoint;
        dispatch(addGameTable(newCopy));
        }
        startPoint++;
      }
    }
  }

  function removeShowPath(g) {
    for(let i=0;i<gameBoard.grid.length;i++) {
      for(let j=0;j<gameBoard.grid.length;j++) {
        g[i][j].showPath = false;
    }
  }
}

function newMessage(firstSelected,g,active,x,y) {
  socket.emit('sync-action',roomId,changeMessage(`Támadás! Az ${active+1}-es játékos támad a(z) "${firstSelected.data.name}" nevű bábuval. Az ellenfél a(z) "${g[x][y].data.name}" nevű bábuval védekezik`),false,ack => {});
}

function battle(firstSelected,g,x,y,active) {

  // === Speciális esetek ===

  // 1-es támad 10-est
  if(firstSelected.data.name === "1" && g[x][y].data.name === "10") {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
      let newCopy = JSON.stringify(firstSelected);
      socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      socket.emit('sync-action',roomId,removeGameTable(g[x][y]),false,ack => {});
      socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
      if(active === player) {
        socket.emit('sync-action',roomId,addRightHand(g[x][y]),false,ack => {});
      } else {
        socket.emit('sync-action',roomId,addLeftHand(g[x][y]),false,ack => {});
      }
      socket.emit('sync-action',roomId,changeMessage(`A támadás véget ért! A párbaj nyertese a támadó!`),false,ack => {});
    }, 5000);
    return;
  }

  // 10-es támad 1-est
  if(firstSelected.data.name === "10" && g[x][y].data.name === "1") {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    if(active === 1) {
      socket.emit('sync-action',roomId,addLeftHand(firstSelected),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addRightHand(firstSelected),false,ack => {});
    }
    socket.emit('sync-action',roomId,changeMessage(`A támadás véget ért! A párbaj nyertese a védekező!`),false,ack => {});
    }, 5000);
    return;
  }

  // 3-as (aknász) hatástalanítja a bombát
  if(firstSelected.data.name === "3" && g[x][y].data.name === "B") {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    let newCopy = JSON.stringify(firstSelected);
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    newCopy = JSON.parse(newCopy);
    newCopy.x = x;
    newCopy.y = y;
    socket.emit('sync-action',roomId,removeGameTable(g[x][y]),false,ack => {});
    socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
    if(active === 1) {
      socket.emit('sync-action',roomId,addRightHand(g[x][y]),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addLeftHand(g[x][y]),false,ack => {});
    }
    socket.emit('sync-action',roomId,changeMessage(`A(z) ${active+1}-es játékos sikeresen hatástalanította a bombát!`),false,ack => {});
    }, 5000);
    return;
  }

  // Ha valami (nem aknász) bombára lép
  if(firstSelected.data.name !== "3" && g[x][y].data.name === "B") {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    if( active === 1) {
      socket.emit('sync-action',roomId,addLeftHand(firstSelected),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addRightHand(firstSelected),false,ack => {});
    }
    socket.emit('sync-action',roomId,changeMessage(`A(z) ${active+1}-es játékos bombára lépett!`),false,ack => {});
    }, 5000);
    return;
  }

  // Általános támadás - támadó a gyengébb
  if(parseInt(firstSelected.data.name) < parseInt(g[x][y].data.name)) {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    if(active === 1) {
      socket.emit('sync-action',roomId,addLeftHand(firstSelected),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addRightHand(firstSelected),false,ack => {});
    }
    
    socket.emit('sync-action',roomId,changeMessage(`A támadás véget ért! A párbaj nyertese a védekező!`),false,ack => {});
    }, 5000);
  
    return;
  }

  // Általános támadás - támadó az erősebb
  if(parseInt(firstSelected.data.name) > parseInt(g[x][y].data.name)) {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    let newCopy = JSON.stringify(firstSelected);
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    newCopy = JSON.parse(newCopy);
    newCopy.x = x;
    newCopy.y = y;
    socket.emit('sync-action',roomId,removeGameTable(g[x][y]),false,ack => {});
    socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
    if(active === 1) {
      socket.emit('sync-action',roomId,addRightHand(g[x][y]),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addLeftHand(g[x][y]),false,ack => {});
    }
    socket.emit('sync-action',roomId,changeMessage(`A támadás véget ért! A párbaj nyertese a támadó!`),false,ack => {});
    }, 5000);
    return;
  }

  // Egyenlő erők
  if(parseInt(firstSelected.data.name) === parseInt(g[x][y].data.name)) {
    newMessage(firstSelected,g,active,x,y);
    setTimeout(function(){
    socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
    socket.emit('sync-action',roomId,removeGameTable(g[x][y]),false,ack => {});
    if(active === 1) {
      socket.emit('sync-action',roomId,addLeftHand(firstSelected),false,ack => {});
      socket.emit('sync-action',roomId,addRightHand(g[x][y]),false,ack => {});
    } else {
      socket.emit('sync-action',roomId,addRightHand(firstSelected),false,ack => {});
      socket.emit('sync-action',roomId,addLeftHand(g[x][y]),false,ack => {});
    }
    socket.emit('sync-action',roomId,changeMessage(`A támadás véget ért! Mindkettő fél bábuja lekerült!`),false,ack => {});
    }, 5000);
    return;
  }

  // Zászlót találunk
  if(g[x][y].data.name === "Z") {
    socket.emit('sync-action',roomId,changeEndGame(1),false,ack => {});
    socket.emit('sync-action',roomId,changePlayer(-1),false,ack => {});
    socket.emit('sync-action',roomId,changeMessage(`Vége a játéknak! Az ${player+1}-es játékos nyert! Kilépéshez kattints a "vissza a menübe gombra!"`),false,ack => {});
  }

}

  if(activePlayer !== -1 && endgame === 1) {
    console.log("1- lesz az új játékos");
    socket.emit('sync-action',roomId,changePlayer(-1),false,ack => {})
  }

  console.log(activePlayer);


  function boardClickHandler(g,x,y,active) {
    if(firstSelected === "" && g[x][y].data!=="" && ((g[x][y].yours === player && active === player)) && g[x][y].data.name!=="Z" && g[x][y].data.name!=="B") {
      firstSelected = g[x][y];
      setSelectedX(x);
      setSelectedY(y);
      showPath(g,x,y,active);
    } else if(firstSelected !== "" && g[x][y].data==="" && g[x][y].showPath === true) {
      let newCopy = JSON.stringify(firstSelected);
      newCopy = JSON.parse(newCopy);
      newCopy.x = x;
      newCopy.y = y;
      removeShowPath(g);
      socket.emit('sync-action',roomId,removeGameTable(firstSelected),false,ack => {});
      socket.emit('sync-action',roomId,addGameTable(newCopy),false,ack => {});
      firstSelected = "";
      endgame===1 ? socket.emit('sync-action',roomId,changePlayer(-1),false,ack => {}) : active === 0 ? socket.emit('sync-action',roomId,changePlayer(1),false,ack => {}) : socket.emit('sync-action',roomId,changePlayer(0),false,ack => {});
    } else if(firstSelected !== "" && g[x][y].data.id===firstSelected.data.id && g[x][y].showPath === false) {
      setSelectedX(-1);
      setSelectedY(-1);
      removeShowPath(g);
      firstSelected="";
    } else if(firstSelected !== "" && ((active === player && g[x][y].yours === otherPlayer)) && g[x][y].showPath === true) {
        battle(firstSelected,g,x,y,active);
        removeShowPath(g);
        endgame===1 ? socket.emit('sync-action',roomId,changePlayer(-1),false,ack => {}) : active === 0 ? socket.emit('sync-action',roomId,changePlayer(1),false,ack => {}) : socket.emit('sync-action',roomId,changePlayer(0),false,ack => {});
        firstSelected = "";
    }
  }

  return (


    <div className="wrapper fadeInDown">

      <div id="prepareContent">

        <div className="fadeIn first">
          <h2 className="fadeIn first">Játék ({player+1}. játékos vagy)</h2>
  <h3 className="fadeIn first">Az {activePlayer+1}. játékos lép</h3>
        </div>

        <div className="row fadeIn second">
          <div className="col-md-3">
            <h2 style={{color:`${activePlayer === 0 ? 'orangered' : 'white'}`}} >Player 1</h2>
            <img className="profilePic fadeIn third" src="https://source.unsplash.com/user/erondu/150x150" alt="random" />
            <h2>Levett bábuk</h2>
            <BoardTo className="inventory" type={"leftHand"} data={firstPlayerHand} onClick={boardClickHandler} where={"leftHand"} selectedY={selectedY}/>
          </div>
          <div className="col-md-6">
            <div>
            <BoardTo className="inventory" type={"inGame"} sizeX={6} data={gameBoard} onClick={boardClickHandler} selectedX={selectedX}  where={"inGame"} selectedY={selectedY} activePlayer={activePlayer} player={player}/>
            <h2>Események</h2>
            <p style={{wordBreak: 'break-all'}}>{message}</p>
            </div>
          </div>
          <div className="col-md-3">
            <h2 style={{color:`${activePlayer === 1 ? 'aqua' : 'white'}`}}>Player 2</h2>
            <img className="profilePic fadeIn third" src="https://source.unsplash.com/user/erondu/150x150" alt="random" />
            <h2>Levett bábuk</h2>
            <BoardTo className="inventory" type={"rightHand"} data={secondPlayerHand} onClick={boardClickHandler} where={"rightHand"} selectedY={selectedY}/>
          </div>
        </div>

        <hr className="fadeIn third"></hr>
        <button className="fadeIn third" disabled={endgame === 0} onClick={() => window.location.reload(true)}>Vissza a menübe</button>

        <div id="mainFooter">
          <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}

export default InGame;