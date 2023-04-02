import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketService } from 'src/app/services/web-socket.service';


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
  users: any[] = [];

  subscriptionAttack: Subscription = new Subscription(); 



  constructor(
    private localstorage: LocalStorageService,
    private socketService: SocketService,
  ) { }
  

  ngOnInit(): void {
    const data = this.localstorage.get("myboard");
    this.fillBoard(data);
    const pointsShips = this.getAdjacents(this.getPointsShip());
    this.ships = this.mappingShips(pointsShips);
    

    this.subscriptionAttack = this.socketService.listen('result-attack').subscribe((data) => {
      this.changeCellResultAttack(data);
    });
  }

  ngAfterViewInit() {
    this.blockCellShipsOwn(this.getPointsShip());
  }

  fillBoard(data: any[]){
    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.board.push({
          type: data[i][j],
          point:{x:j, y:i}
        });
      }
    }
  }

  getPointsShip(): any[]{
    const points = this.board.filter(cell => cell.type != 0);
    return points;
  }

  getAdjacents(data: any[]): any{
    let validPoints = [...data];
    let groupShips:any[] = [];

    let adjacentGroup: any[] = [];
    validPoints.forEach((cell, i) => {
      let adjacentPositions = []
      if (cell.type === 'H') {
        adjacentPositions = [
          { x: cell.point.x - 1, y: cell.point.y }, // Izquierda
          { x: cell.point.x + 1, y: cell.point.y } // Derecha
        ];
      }else{
        adjacentPositions = [ 
          { x: cell.point.x, y: cell.point.y - 1 }, // Arriba
          { x: cell.point.x, y: cell.point.y + 1 } // Abajo
        ];
      }
      
      const ActualList = adjacentGroup.find(({point:{x,y}}) => {
        const isValidX = cell.point.x === x;
        const isValidY = cell.point.y === y;
        return isValidX && isValidY;
      });
      if (adjacentGroup.length !== 0) {
        if (ActualList === undefined) {
          groupShips.push([...adjacentGroup]);
          adjacentGroup = [];
          adjacentGroup = [cell];
        }
      }else{
        adjacentGroup = [cell];
      }
      for (let j = i + 1; j < data.length; j++) {
        let adjacentObj = {...data[j]};
        const isValidAdjacent = adjacentPositions.find(({ x, y }) => {
          const isValidX = adjacentObj.point.x === x;
          const isValidY = adjacentObj.point.y === y;
          return isValidX && isValidY;
        });
        if (isValidAdjacent) {
          adjacentGroup.push(adjacentObj);
          i = j; // saltar al siguiente objeto en la lista principal
        }
      }

      if (i === (validPoints.length -1)) {
        groupShips.push([...adjacentGroup]);
      }
      
    })

    return groupShips;
  }

  mappingShips(positionsAdjacents: any[]): any[]{
    interface shipMap {
      id:number;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      positions: any[];
      orientation: 'DH' | 'DV';
      url: string;
    }

    let shipsMapped: any[] = [];

    positionsAdjacents.forEach(groupPoins => {
      const sortedPositions = groupPoins.sort((a: any, b: any) => a.point.x - b.point.x);
      const startX = sortedPositions[0].point.x;
      const startY = sortedPositions[0].point.y;
      const endX = sortedPositions[sortedPositions.length - 1].point.x;
      const endY = sortedPositions[sortedPositions.length - 1].point.y;
      const orientation = (startX === endX) ? 'DV' : 'DH';
      const url = this.getUrlImage(orientation);
      const shipMapped ={
        id: `${startX}-${startY}=${endX}-${endY}`,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        positions: groupPoins,
        orientation: orientation,
        url: url
      }

      shipsMapped.push(shipMapped);
    });
    return shipsMapped;

  }

  selectPoint( point: any){
    this.clearSelection()
    const cell = document.getElementById(`${point.x}-${point.y}`);
    if (cell !== null) {
      if (!cell.className.includes('cell_invalid')) {
        this.cellSelect = cell;
        cell.className = 'cell_select';
        this.attackPoint = point;
      }
    }
    console.log("punto seleccionado " + JSON.stringify(point));
  }

  clearSelection() {
    const selectedCells = document.querySelectorAll('.cell_select');
    selectedCells.forEach(cell => {
      cell.classList.replace('cell_select', 'cell');
    });
  }

  blockCellShipsOwn(pointsShips: any[]){
    pointsShips.forEach((cellPoint)=>{
      const id = `${cellPoint.point.x}-${cellPoint.point.y}`
      const cell = document.getElementById(id);
      if (cell !== null) {
        cell.className = 'cell_invalid';
      }
    })
  }

  changeCellResultAttack(resultAttack: any){
    const id = `${resultAttack.attack.x}-${resultAttack.attack.y}`
    console.log(`id a buscar: ${id}`)
    const cell = document.getElementById(id);
    if (cell !== null) {
      if (resultAttack.result) {
        console.log(`entro a cambiar el result true id ${id}`)
        cell.className = 'cell_invalid fire';
      }else{
        console.log(`entro a cambiar el result false id ${id}`)
        cell.className = 'cell water';
      }
    }
  }

  attack(){
    if (this.cellSelect !== null) {
      this.cellSelect.className = 'cell';
    }
    this.cellSelect = null;
    const payload = {
      user: this.localstorage.get("userClient"),
      attack: this.attackPoint,
      result: true
    }
    this.socketService.emitEvent('send-atack',payload);
  }

  getUrlImage(orientation : string){
    const ranDig = Math.floor(Math.random() * (7)) + 1;
    const url = `/assets/ships/Ship${orientation}${ranDig}.png`
    return url
  }

}
