import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColectivoComponent } from './colectivo.component';

describe('ColectivoComponent', () => {
  let component: ColectivoComponent;
  let fixture: ComponentFixture<ColectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
