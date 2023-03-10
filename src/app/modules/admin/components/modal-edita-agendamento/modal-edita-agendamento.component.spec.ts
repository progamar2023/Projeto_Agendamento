import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditaAgendamentoComponent } from './modal-edita-agendamento.component';

describe('ModalEditaAgendamentoComponent', () => {
  let component: ModalEditaAgendamentoComponent;
  let fixture: ComponentFixture<ModalEditaAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditaAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
