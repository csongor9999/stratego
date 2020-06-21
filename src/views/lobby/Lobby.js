import React from 'react';
import "../../styles/main.css"
import "../../styles/maincontent.css"
import { socket } from '../../state/socket';

function Lobby({ gameStateEnum, onSelect, setPlayer, setRoomId, roomId }) {


  if(roomId === '') {
    socket.emit('create-room',ack => {
      setRoomId(ack.roomId);
    });
  }

  console.log("Küldött:", roomId);

  socket.on('player-joined',ack => {
    setPlayer(0);
    onSelect(gameStateEnum.PREPARE_GAME);
  })




  return (
    <div className="wrapper fadeInDown">
      <div id="mainContent">

        <div className="fadeIn first">
        <h2 className="fadeIn second">Játék ID</h2>
        <p className="fadeIn second invite">{roomId}</p>
        <h3 className="fadeIn second">Várakozás a második játékosra...</h3>
        </div>

        <hr className="fadeIn third"></hr>

        <button className="fadeIn third" onClick={() => onSelect(gameStateEnum.MAIN_PAGE)}>Vissza a menübe</button>

        <div id="mainFooter">
          <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}

export default Lobby;