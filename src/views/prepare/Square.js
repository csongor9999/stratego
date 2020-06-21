import React from 'react';


export class Square extends React.Component{
  render(){
    const color_ = this.props.color;
    const data = this.props.data ?? "";
    const player = data.yours;
    const i = this.props.i;
    const j = this.props.j;
    const where = this.props.where;
    const sizeX = this.props.sizeX;
    const type = this.props.type;
    const selectedX = this.props.selectedX;
    const selectedY = this.props.selectedY;
    const showPath = data.showPath;
    const currPlayer = this.props.player;


      return (

        <td
          style={{overflow:'hidden', height:'50px', width:'50px', border:`1px solid ${(i<2 && type==="gameBoard" ? 'aqua' : i>=sizeX-2 && type==="gameBoard" ? 'red' : 'black' )}`,backgroundColor:`${!showPath ? 'rgba(100,100,100,0.5)' : 'rgba(100,100,100,1)'}`}}
        onClick={this.props.handleClick} >
          <div
            style={{color:`${player === 0 ? (selectedX === i && selectedY === j && type === where? 'yellow' : 'orangered') : (selectedX === i && selectedY === j && type === where ? 'yellow' : 'aqua')}`,
                    backgroundColor: color_,
                    borderColor: color_,
                    fontSize:'1.5em',
                    fontWeight:'bold',
                    height:25,
                    width:50
                    }} >
                      {currPlayer === player || (type!=="inGame" && type!=="gameBoard")  ? data.data.name : data.data!=='' ? 'X' : ''}
          </div>
        </td>
      )
  }
}