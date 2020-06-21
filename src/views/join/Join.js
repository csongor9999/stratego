import React, { useState } from 'react';
import "../../styles/main.css"
import "../../styles/maincontent.css"
import { socket } from '../../state/socket';

function Join({ gameStateEnum, onSelect,setPlayer,setRoomId }) {

  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const givenId = document.getElementById('gameid').value;
      socket.emit('join-room',givenId,ack => {
        if(ack.status === 'ok') {
          setPlayer(1);
          setRoomId(givenId);
          onSelect(gameStateEnum.PREPARE_GAME);
        } else {
          setError(ack.message);
        }
      });
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="mainContent">

        <div className="fadeIn first">
          <h2>Csatlakozás a játékhoz</h2>
          <h3>{error}</h3>
        </div>

        <form>
          <input type="text" id="gameid" className="fadeIn second" name="gameid" placeholder="Enter game ID" />
          <button className="fadeIn second" onClick={handleSubmit} >Csatlakozás</button>
        </form>

        <hr className="fadeIn third"></hr>

        <button className="fadeIn third" onClick={() => onSelect(gameStateEnum.MAIN_PAGE)}>Vissza a menübe</button>

        <div id="mainFooter">
          <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}

export default Join;