import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { ModalAdicionarUsuarioComponent } from '../components/modal/modal-adicionar-usuario/modal-adicionar-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  public paginaAtual = 1;
  public usuarios: Usuario[] = [];
  
  
  constructor(private usuarioService: LoginService, private dialog: MatDialog,
    private notificacao: NotificacaoService) {}
  
  ngOnInit() {
    this.getUsuarios();
  }
  
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(x => {
      if(x) {
        this.usuarios = JSON.parse(JSON.stringify(x)) as Usuario[];
      }
    })
  }

  abreModalAddUsuario() {
      const dialogRef = this.dialog.open(ModalAdicionarUsuarioComponent,  {
        data: {
          titulo: 'Cadastrar Usuário'
        },
        height: '500px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          if(resposta == true) {
            this.notificacao.showSuccess('Usuário cadastrado com sucesso!', 'Cadastrado');
          }
          this.getUsuarios();
        });
  }

    editeUsuario(usuario: any) {
      const dialogRef = this.dialog.open(ModalAdicionarUsuarioComponent,  {
        data: {
          titulo: 'Editar Usuario ' + usuario.id,
          usuario: usuario
        },
        height: '400px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          if(resposta == true) {
            this.notificacao.showSuccess('Usuário editado com sucesso!', 'Editado');
          }
          this.getUsuarios();
        });
    }

    deletaUsuario(usuario: any) {
      this.usuarioService.delUsuario(usuario.id).subscribe( x => {
          this.getUsuarios();
          this.notificacao.showSuccess('Excluido com sucesso!', 'Deletado');
      })
    }
}
