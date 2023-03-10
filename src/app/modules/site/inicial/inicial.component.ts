import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';
import { HorarioFuncionamentoComponent } from '../components/horario-funcionamento/horario-funcionamento.component';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  configuracaoSistema: Configuracao[] = [];
  
  constructor(private configuracaoService: ConfiguracoesService, private dialog: MatDialog) {

  }

  sobre?: Configuracao = new Configuracao();
  galeriaFoto1?: Configuracao = new Configuracao();
  galeriaFoto2?: Configuracao = new Configuracao();
  galeriaFoto3?: Configuracao = new Configuracao();
  infoSalao?: Configuracao = new Configuracao();
  corSite?: Configuracao = new Configuracao ();
  segunda: boolean = true;
  terca: boolean = true;
  quarta: boolean = true;
  quinta: boolean = true;
  sexta: boolean = true;
  sabado: boolean = true;
  domingo: boolean = true;

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
        this.segunda = this.configuracaoSistema.find(x => x.descricao == "Segunda-Feira")?.valor == "true";
        this.terca = this.configuracaoSistema.find(x => x.descricao == "Terça-Feira")?.valor == "true";
        this.quarta = this.configuracaoSistema.find(x => x.descricao == "Quarta-Feira")?.valor == "true";
        this.quinta = this.configuracaoSistema.find(x => x.descricao == "Quinta-Feira")?.valor == "true";
        this.sexta = this.configuracaoSistema.find(x => x.descricao == "Sexta-Feira")?.valor == "true";
        this.sabado = this.configuracaoSistema.find(x => x.descricao == "Sábado")?.valor == "true";
        this.domingo = this.configuracaoSistema.find(x => x.descricao == "Domingo")?.valor == "true";
      }
    })
  }

  abreModalAddServico() {
    const dialogRef = this.dialog.open(HorarioFuncionamentoComponent,  {
      data: {
        configuracoes: this.configuracaoSistema
      },
      height: '400px',
      width: '360px'
    });
  }
}
