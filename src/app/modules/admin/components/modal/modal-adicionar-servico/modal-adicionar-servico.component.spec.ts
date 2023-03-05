import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarServicoComponent } from './modal-adicionar-servico.component';

describe('ModalAdicionarServicoComponent', () => {
  let component: ModalAdicionarServicoComponent;
  let fixture: ComponentFixture<ModalAdicionarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
