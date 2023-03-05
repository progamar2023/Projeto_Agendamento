import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarUsuarioComponent } from './modal-adicionar-usuario.component';

describe('ModalAdicionarUsuarioComponent', () => {
  let component: ModalAdicionarUsuarioComponent;
  let fixture: ComponentFixture<ModalAdicionarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
