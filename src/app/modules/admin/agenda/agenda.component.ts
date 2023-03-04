import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/model/Agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{

  public paginaAtual = 1;
  public agendamentos: Agendamento[] = [];
  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.getContatos();
  }
  
  getContatos() {
    this.agendamentoService.getAgendamentos().subscribe(x => {
      if(x) {
        this.agendamentos = x;
      }
    })
  }
}
