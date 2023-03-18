import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTipoServicoComponent } from './adicionar-tipo-servico.component';

describe('AdicionarTipoServicoComponent', () => {
  let component: AdicionarTipoServicoComponent;
  let fixture: ComponentFixture<AdicionarTipoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarTipoServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarTipoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
