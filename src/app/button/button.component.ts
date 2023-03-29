import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = '';
  @Output() clickBtn: EventEmitter<any> = new EventEmitter();
  @Input() disabled: boolean = false;



  onClick() {
    this.clickBtn.emit()
  }
  
  ngOnInit(): void {
  }

}
