import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';

@Component({
  selector: 'app-modal-adicionar-usuario',
  templateUrl: './modal-adicionar-usuario.component.html',
  styleUrls: ['./modal-adicionar-usuario.component.css']
})
export class ModalAdicionarUsuarioComponent implements OnInit {
  titulo = '';
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  editar: boolean = false;
  perfil: boolean = false;
   

  constructor(public dialogRef: MatDialogRef<ModalAdicionarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private usuarioServico: LoginService, 
      private notificacao: NotificacaoService) {

      if(data && data.titulo) {
        this.titulo = data.titulo;
      }
      if(data && data.usuario) {
        this.editar = true;
        this.usuario = data.usuario;
      }
      if(data && data.perfil == true) {
          this.perfil = true
      }


  }
  ngOnInit(): void {
    this.createForm();
  
   
  }

  createForm() {
    return this.form = new FormGroup({
      nome: new FormControl(this.usuario?.nome, [Validators.required]),
      email: new FormControl(this.usuario?.email, [Validators.email, Validators.required]),
      senha: new FormControl(this.usuario?.senha, Validators.required),
    });
  }

  onSubmit(usuario: Usuario) {
    this.usuarioServico.postUsuario(usuario).subscribe( x => {
        this.close(true);    
    })
  }

  editaUsuario(usuario: Usuario) {
    usuario.id = this.usuario.id;
    this.usuarioServico.putUsuario(usuario).subscribe( x => {
        
        this.close(true);
      
    })
  }


  close(resposta?: any): void {
    this.dialogRef.close(resposta);
  }
  
}
