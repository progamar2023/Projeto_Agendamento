import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicoComponent } from './tipo-servico.component';

describe('TipoServicoComponent', () => {
  let component: TipoServicoComponent;
  let fixture: ComponentFixture<TipoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
