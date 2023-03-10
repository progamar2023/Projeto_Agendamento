import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agendamento } from 'src/app/model/Agendamento';
import { ServicoRequest } from 'src/app/model/Servico';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ServicoService } from 'src/app/services/servico.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';

@Component({
  selector: 'app-modal-edita-agendamento',
  templateUrl: './modal-edita-agendamento.component.html',
  styleUrls: ['./modal-edita-agendamento.component.css']
})
export class ModalEditaAgendamentoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  agendamento: Agendamento = new Agendamento();
  servicos: ServicoRequest[] = [];
  dataAtual = new Date();


  constructor(public dialogRef: MatDialogRef<ModalEditaAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private agendamentoService: AgendamentoService, private notificacao: NotificacaoService, private servicoService: ServicoService) {
      if(data) {
        this.agendamento = data.agendamento;
      }
    }
  
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
    this.agendamentoService.putAgendamento(agendamento).subscribe(x => {
      if(x !== undefined) {
        this.notificacao.showSuccess('Alterado com sucesso!', 'Editado');
        this.dialogRef.close();
      }
    })
  }
}
