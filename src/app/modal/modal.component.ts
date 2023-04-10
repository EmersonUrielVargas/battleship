import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() header: boolean = false;
  @Input() modalBodyWinner = false; // componente para el body del modal
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.visible = true;
  }

  closeModal() {
    console.log('Estamos try close modal')
    console.log(this.visible)
    this.visible = false;
    this.close.emit();
  }

}
