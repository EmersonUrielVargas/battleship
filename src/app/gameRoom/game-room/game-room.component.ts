import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {
  board: any[] = [];
  attackPoint = {x:'0', y:'0'};
  boardRows : number = 15;
  colorBoard: string = '#FFFFFF';
  boardColumns : number = 30;
  classCell: string = 'cell'
  cellSelect :any = null;
  ships: any[] = [];


  constructor() { }
  

  ngOnInit(): void {
    this.fillBoard();
  }

  fillBoard(){

    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.board.push({x:i, y:j});
      }
    }
    console.log(this.board)
  }

  selectPoint( point: any){
    this.clearSelection()
    const cell = document.getElementById(`${point.x}-${point.y}`);
    if (cell !== null) {
      this.cellSelect = cell;
      cell.className = 'cell_select';
      this.attackPoint = point;
    }
    console.log("punto seleccionado " + JSON.stringify(point));
  }



  clearSelection() {
    const selectedCells = document.querySelectorAll('.cell_select');
    selectedCells.forEach(cell => {
      cell.classList.replace('cell_select', 'cell');
    });
  }

  attack(){
    if (this.cellSelect !== null) {
      this.cellSelect.className = 'cell';
    }
    this.cellSelect = null;
    console.log("sending pointAttack " + JSON.stringify(this.attackPoint));
  }

}
