import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.css']
})
export class InputCustomComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  value: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  
  get valid(): boolean {
    return this.value !== '';
  }

  get getValue(): string {
    return this.value;
  }


}
