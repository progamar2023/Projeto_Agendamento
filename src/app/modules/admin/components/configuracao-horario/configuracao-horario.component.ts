import { Component, OnInit } from '@angular/core';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-configuracao-horario',
  templateUrl: './configuracao-horario.component.html',
  styleUrls: ['./configuracao-horario.component.css']
})
export class ConfiguracaoHorarioComponent implements OnInit {

 configuracaoSistema: Configuracao[] = [];

 segunda: boolean = true;
 terca: boolean = true;
 quarta: boolean = true;
 quinta: boolean = true;
 sexta: boolean = true;
 sabado: boolean = true;
 domingo: boolean = true;

  constructor(private configuracaoService: ConfiguracoesService) {}

  ngOnInit(): void {
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.configuracaoService.getConfiguracoes().subscribe(x => {
      if(x) {
        this.configuracaoSistema = JSON.parse(JSON.stringify(x)) as Configuracao[];
        
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
  

  editaConfiguracao(conf: any) {
    this.configuracaoService.putConfiguracao(conf).subscribe(x => {

    });
  }

}
