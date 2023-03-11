import { Component, OnInit } from '@angular/core';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuAdminComponent implements OnInit {
  configuracaoSistema: Configuracao[] = [];

  constructor(private configuracaoService: ConfiguracoesService) {

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
}
