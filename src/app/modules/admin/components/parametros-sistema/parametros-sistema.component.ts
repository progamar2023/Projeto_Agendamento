import { Component, OnInit } from '@angular/core';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-parametros-sistema',
  templateUrl: './parametros-sistema.component.html',
  styleUrls: ['./parametros-sistema.component.css']
})
export class ParametrosSistemaComponent implements OnInit {
  configuracaoSistema: Configuracao[] = [];
  
  constructor(private configuracaoService: ConfiguracoesService) {

  }

  sobre?: Configuracao = new Configuracao();
  galeriaFoto1?: Configuracao = new Configuracao();
  galeriaFoto2?: Configuracao = new Configuracao();
  galeriaFoto3?: Configuracao = new Configuracao();
  infoSalao?: Configuracao = new Configuracao();
  corSite?: Configuracao = new Configuracao ();

  ngOnInit(): void {
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.configuracaoService.getConfiguracoes().subscribe(x => {
      if(x) {
        
        this.configuracaoSistema = JSON.parse(JSON.stringify(x)) as Configuracao[];
        this.sobre = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Sobre-Site");
        this.galeriaFoto1 = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Galeria-Site" && x.posicao == 1);
        this.galeriaFoto2 = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Galeria-Site" && x.posicao == 2);
        this.galeriaFoto3 = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Galeria-Site" && x.posicao == 3);
        this.infoSalao = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Salao");
        this.corSite = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Site-Cor");
      }
    })
  }
}
