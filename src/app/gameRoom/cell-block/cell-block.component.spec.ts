import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellBlockComponent } from './cell-block.component';

describe('CellBlockComponent', () => {
  let component: CellBlockComponent;
  let fixture: ComponentFixture<CellBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
