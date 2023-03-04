import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoHorarioComponent } from './configuracao-horario.component';

describe('ConfiguracaoHorarioComponent', () => {
  let component: ConfiguracaoHorarioComponent;
  let fixture: ComponentFixture<ConfiguracaoHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
