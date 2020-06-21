import React from 'react';
import "../../styles/main.css"
import "../../styles/maincontent.css"
import { getReady } from '../../state/ready/selectors';
import { useSelector } from 'react-redux';

function Join({ gameStateEnum, onSelect,setPlayer,setRoomId }) {

  const ready = useSelector(getReady)

  if(ready === 2) {
    setTimeout(function(){ onSelect(gameStateEnum.IN_GAME); }, 1000);
  }


  return (
    <div className="wrapper fadeInDown">
      <div id="mainContent">

        <div className="fadeIn first">
          <h2>Várakozás a másik játékosra</h2>
        </div>

        <hr className="fadeIn third"></hr>

        <div id="mainFooter">
          <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}

export default Join;
