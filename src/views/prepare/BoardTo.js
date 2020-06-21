import React from 'react';
import { Square } from './Square';

export class BoardTo extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = props.onClick;
    this.limitToPlace = props.limitToPlace;
    this.sizeX = props.sizeX ?? 0;
    this.type = props.type;
  }

  render(){
    const fieldClass = this.sizeX===6 ? 'inGameField' : '';
    const style={margin: 'auto',textAlign: "center",border:"3px solid black",tableLayout:'fixed'};
    const g = this.props.data.grid;
    const activePlayer = this.props.activePlayer ?? 0;
    const player = this.props.player;
    const where = this.props.where;
    const board = g.map((row, i) => { return (
      <tr key={"row_"+i}>
        {row.map((col, j) => {
          return (
            <Square handleClick={()=>this.handleClick(g,i,j,activePlayer,where)} key={i+"_"+j} limitToPlace={this.limitToPlace} data={g[i][j]} i={i} j={j} sizeX={this.sizeX} type={this.type} selectedX={this.props.selectedX} selectedY={this.props.selectedY} where={this.props.where} player={player}/>
              )
            }
          )
        }
      </tr>)
    });
    return (
      <div className={fieldClass}>
      <table cellSpacing="0" style={style}>
        <tbody>
          {board}
        </tbody>
      </table>
      </div>
    )
  }
}


export default BoardTo;