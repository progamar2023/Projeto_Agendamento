import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Configuracao } from 'src/app/model/Configuracao';
import { Usuario } from 'src/app/model/Usuario';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { ModalAdicionarUsuarioComponent } from '../modal/modal-adicionar-usuario/modal-adicionar-usuario.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuAdminComponent implements OnInit {
  configuracaoSistema: Configuracao[] = [];

  constructor(private configuracaoService: ConfiguracoesService, private dialog: MatDialog,
    private notificacao: NotificacaoService) {

  }

  infoSalao?: Configuracao = new Configuracao();
  corSite?: Configuracao = new Configuracao ();

  ngOnInit(): void {
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.configuracaoService.getConfiguracoes().subscribe(x => {
      if(x) {
        
        this.configuracaoSistema = JSON.parse(JSON.stringify(x)) as Configuracao[];
        this.infoSalao = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Salao");
        this.corSite = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Site-Cor");
      
      }
    })
  }

  editarPerfil() {
    var usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
    const dialogRef = this.dialog.open(ModalAdicionarUsuarioComponent,  {
      data: {
        titulo: 'Perfil',
        usuario: usuario,
        perfil: true
      },
      height: '400px',
      width: '800px'
    });
  
      dialogRef.afterClosed().subscribe(resposta => {
        if(resposta == true) {
          this.notificacao.showSuccess('Perfil editado com sucesso!', 'Editado');
        }
       
      });
  }
}
