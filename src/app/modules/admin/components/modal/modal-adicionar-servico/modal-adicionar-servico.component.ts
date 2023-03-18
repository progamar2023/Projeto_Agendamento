import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
  imagem = null;
   

  constructor(public dialogRef: MatDialogRef<ModalAdicionarServicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private servicoServico: ServicoService, 
    private tipoServicoService: TipoServicoService, private notificacao: NotificacaoService, private changeDetector:ChangeDetectorRef) {

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
      id: new FormControl(this.servico?.id),
      nome: new FormControl(this.servico?.nome, [Validators.required]),
      descricao: new FormControl(this.servico?.descricao, Validators.required),
      tipoServicoId: new FormControl(this.servico?.tipoServicoId, Validators.required),
      imagem: new FormControl(this.servico?.imagem)
    });
  }

  onSubmit(servico: Servico) {
    delete(servico.id);
    if(this.imagem) {
      servico.imagemBase64 = this.imagem;
    }
    this.servicoServico.postServico(servico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Serviço cadastrado com sucesso!', 'Cadastrado');
        this.close();
      }
    })
  }

  editarServico(servico: Servico) {
    if(this.imagem) {
      servico.imagemBase64 = this.imagem;
    }
    this.servicoServico.putServico(servico).subscribe( x => {
      if(x) {
        this.notificacao.showSuccess('Serviço editado com sucesso!', 'Cadastrado');
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

  imageUpload(event:any)
  {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.imagem = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");;
           this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  close(): void {
    this.dialogRef.close();
  }
  
}
