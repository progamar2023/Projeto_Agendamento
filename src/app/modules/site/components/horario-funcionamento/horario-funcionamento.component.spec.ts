import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioFuncionamentoComponent } from './horario-funcionamento.component';

describe('HorarioFuncionamentoComponent', () => {
  let component: HorarioFuncionamentoComponent;
  let fixture: ComponentFixture<HorarioFuncionamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioFuncionamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioFuncionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
