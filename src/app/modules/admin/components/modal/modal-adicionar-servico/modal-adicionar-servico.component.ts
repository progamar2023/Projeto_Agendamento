import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servico, TipoServico } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/services/servico.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';

@Component({
  selector: 'app-modal-adicionar-servico',
  templateUrl: './modal-adicionar-servico.component.html',
  styleUrls: ['./modal-adicionar-servico.component.css']
})
export class ModalAdicionarServicoComponent implements OnInit {

  titulo = '';
  tiposServico: TipoServico[] = [];
  form: FormGroup = new FormGroup({});
  servico: Servico = new Servico();
  editar: boolean = false;
  servicoId?: number;
   

  constructor(public dialogRef: MatDialogRef<ModalAdicionarServicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private servicoServico: ServicoService, 
    private tipoServicoService: TipoServicoService, private notificacao: NotificacaoService) {

      if(data && data.titulo) {
        this.titulo = data.titulo;
      }
      if(data && data.servico) {
        this.editar = true;
        this.servico = data.servico;
      }


  }
  ngOnInit(): void {
    this.getTipoServicos();
    this.createForm();
  
   
  }

  createForm() {
    return this.form = new FormGroup({
      nome: new FormControl(this.servico?.nome, [Validators.required]),
      descricao: new FormControl(this.servico?.descricao, Validators.required),
      imagem: new FormControl(this.servico?.imagem),
      tipoServicoId: new FormControl(this.servico?.tipoServicoId, Validators.required)
    });
  }

  onSubmit(servico: Servico) {
    this.servicoServico.postServico(servico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Serviço cadastrado com sucesso!', 'Cadastrado');
        this.close();
      }
    })
  }

  editarServico(servico: Servico) {
    this.servicoServico.postServico(servico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Serviço cadastrado com sucesso!', 'Cadastrado');
        this.close();
      }
    })
  }

  getTipoServicos() {
    this.tipoServicoService.getTiposServico().subscribe(x => {
      if(x) {
        this.tiposServico = x;
      }
    });
  }

  // getIdServico(id: any) {
  //   this.servicoServico.getIdServico(id).subscribe(x => {
  //     if(x) {
  //       this.servico = JSON.parse(JSON.stringify(x)) as Servico;
  //       this.createForm();
  //     }
  //   });
  // }


  close(): void {
    this.dialogRef.close();
  }
  
}
