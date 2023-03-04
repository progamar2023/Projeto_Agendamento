import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from 'src/app/model/Agendamento';
import { ServicoRequest } from 'src/app/model/Servico';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ServicoService } from 'src/app/services/servico.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  agendamento: Agendamento = new Agendamento();
  servicos: ServicoRequest[] = [];
  dataAtual = new Date();


  constructor(private agendamentoService: AgendamentoService, private notificacao: NotificacaoService, private servicoService: ServicoService) {}
  
  ngOnInit() {
    this.createForm();
    this.getServicos();
  }

  private createForm() {
   return this.form = new FormGroup({
      Nome: new FormControl(this.agendamento.nome, [Validators.required]),
      Email: new FormControl(this.agendamento.email, [Validators.email, Validators.required]),
      Telefone: new FormControl(this.agendamento.telefone, Validators.required),
      Descricao: new FormControl(this.agendamento.descricao, Validators.required),
      ServicoId: new FormControl(this.agendamento.servicoId, Validators.required),
      DataAgendamento: new FormControl(this.agendamento, Validators.required),
      UsuarioId: new FormControl(this.agendamento.usuarioId, Validators.required)
    });
  }

  getServicos() {
    this.servicoService.getServicos().subscribe(x => {
      if(x) {
        this.servicos = JSON.parse(JSON.stringify(x)) as ServicoRequest[];
      }
    })
  }

  onSubmit(agendamento: Agendamento) {
    this.agendamentoService.postAgendamento(agendamento).subscribe(x => {
      if(x !== undefined) {
        this.notificacao.showSuccess('Agendado com sucesso!', 'Agendamento Realizado');
        this.form = this.createForm();
      }
    })
  }
}
