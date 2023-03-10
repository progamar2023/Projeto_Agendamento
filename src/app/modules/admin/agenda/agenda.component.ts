import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Agendamento } from 'src/app/model/Agendamento';
import { Servico, ServicoRequest } from 'src/app/model/Servico';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ServicoService } from 'src/app/services/servico.service';
import { ModalEditaAgendamentoComponent } from '../components/modal-edita-agendamento/modal-edita-agendamento.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{

  public paginaAtual = 1;
  public agendamentos: Agendamento[] = [];
  public servicos: ServicoRequest[] = [];
  constructor(private agendamentoService: AgendamentoService, private servicoService: ServicoService , private dialog: MatDialog) {}

  ngOnInit() {
    this.getAgendamentos();
    this.getServicos();
  }
  
  getAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe(x => {
      if(x) {
        this.agendamentos = x;
      }
    })
  }

  getServicos() {
    this.servicoService.getServicos().subscribe(x => {
      this.servicos = JSON.parse(JSON.stringify(x)) as ServicoRequest[];
    })
  }

  getServicoId(id: any) {
    return this.servicos.find(x => x.servico?.id == id)?.servico?.descricao;
  }

  
  editeAgendamento(agendamento: any) {
    const dialogRef = this.dialog.open(ModalEditaAgendamentoComponent,  {
      data: {
        agendamento: agendamento
      },
      height: '600px',
      width: '800px'
    });
  
      dialogRef.afterClosed().subscribe(resposta => {
        this.getAgendamentos();
      });
  }
}
