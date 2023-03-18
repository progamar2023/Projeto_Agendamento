import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoServico } from 'src/app/model/Servico';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';

@Component({
  selector: 'app-adicionar-tipo-servico',
  templateUrl: './adicionar-tipo-servico.component.html',
  styleUrls: ['./adicionar-tipo-servico.component.css']
})
export class AdicionarTipoServicoComponent {
  titulo = '';
  tiposServico: TipoServico = new TipoServico();
  form: FormGroup = new FormGroup({});
  editar: boolean = false;
  servicoId?: number;
  imagem = null;
   

  constructor(public dialogRef: MatDialogRef<AdicionarTipoServicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private tipoServicoService: TipoServicoService, private notificacao: NotificacaoService) {

      if(data && data.titulo) {
        this.titulo = data.titulo;
      }
      if(data && data.servico) {
        this.editar = true;
        this.tiposServico = data.servico;
      }


  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    return this.form = new FormGroup({
      id: new FormControl(this.tiposServico?.id),
      nome: new FormControl(this.tiposServico?.nome, [Validators.required]),
    });
  }

  onSubmit(tipoServico: TipoServico) {
    delete(tipoServico.id);

    this.tipoServicoService.postTipoServico(tipoServico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Tipo de Serviço cadastrado com sucesso!', 'Cadastrado');
        this.close();
      }
    })
  }

  editarTipoServico(tipoServico: TipoServico) {

    this.tipoServicoService.putTipoServico(tipoServico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Tipo de Servico editado com sucesso!', 'Cadastrado');
        this.close();
      }
    })
  }

  close(): void {
    this.dialogRef.close();
  }
}
