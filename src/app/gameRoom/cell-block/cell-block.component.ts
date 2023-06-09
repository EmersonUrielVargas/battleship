import { Component, OnInit,  EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-cell-block',
  templateUrl: './cell-block.component.html',
  styleUrls: ['./cell-block.component.css']
})
export class CellBlockComponent implements OnInit {
  @Output() clickCell: EventEmitter<any> = new EventEmitter();
  @Input() class: string = "cell";
  @Input() id: string = "";



  constructor() { }

  ngOnInit(): void {
  }

  selectCell(): void{
    if(!this.class.includes('cell_invalid')){
      console.log(this.class)
      this.clickCell.emit()
    }else{
      console.log("no puedes seleccionar tus barcos");
    }
  }

}
