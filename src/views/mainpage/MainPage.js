import React from 'react';
import logo from '../../assets/stratego_logo.png'
import "../../styles/main.css"
import "../../styles/maincontent.css"

function MainPage({ gameStateEnum, onSelect }) {
  return (
    <div className="wrapper fadeInDown">
      <div id="mainContent">

        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon" />
        </div>

        <button className="fadeIn second" onClick={() => onSelect(gameStateEnum.WAITING_FOR_SECOND_PLAYER)}>Új játék indítása</button>
        <button className="fadeIn third" onClick={() => onSelect(gameStateEnum.JOIN_GAME)}>Csatlakozás szobához</button>

        <div id="mainFooter">
        <a className="underlineHover fadeIn fourth" href="http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf" target='_blank' rel='noopener noreferrer'>Játékszabályok</a>
        </div>

      </div>
    </div>
  );
}

export default MainPage;