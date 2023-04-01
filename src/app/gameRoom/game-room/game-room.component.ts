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
  boardColumns : number = 30;
  colorBoard: string = '#FFFFFF';
  classCell: string = 'cell'
  cellSelect :any = null;
  ships: any[] = [0];


  constructor() { }
  

  ngOnInit(): void {
    const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                ];
    this.fillBoard(data);
    this.getPointsShip();
  }

  fillBoard(data: any[]){
    let indexData = 0;
    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.board.push({
          type: data[indexData],
          point:{x:j, y:i}
        });
        indexData++;
      }
    }
    console.log(this.board)
  }

  getPointsShip(){
    const points = this.board.filter(cell => cell.type != 0);
    console.log(points);
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
