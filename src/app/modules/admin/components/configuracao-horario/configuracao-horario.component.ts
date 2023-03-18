import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-configuracao-horario',
  templateUrl: './configuracao-horario.component.html',
  styleUrls: ['./configuracao-horario.component.css']
})
export class ConfiguracaoHorarioComponent implements OnInit {

 configuracaoSistema: Configuracao[] = [];
 
 segunda?: Configuracao = new Configuracao();
 terca?: Configuracao = new Configuracao();
 quarta?: Configuracao = new Configuracao();
 quinta?: Configuracao = new Configuracao();
 sexta?: Configuracao = new Configuracao();
 sabado?: Configuracao = new Configuracao();
 domingo?: Configuracao = new Configuracao();

  constructor(private configuracaoService: ConfiguracoesService, private router: Router) {}

  ngOnInit(): void {
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.configuracaoService.getConfiguracoes().subscribe(x => {
      if(x) {
        this.configuracaoSistema = JSON.parse(JSON.stringify(x)) as Configuracao[];
        
        this.segunda = this.configuracaoSistema.find(x => x.descricao == "Segunda-Feira");
        this.terca = this.configuracaoSistema.find(x => x.descricao == "Terça-Feira");
        this.quarta = this.configuracaoSistema.find(x => x.descricao == "Quarta-Feira");
        this.quinta = this.configuracaoSistema.find(x => x.descricao == "Quinta-Feira");
        this.sexta = this.configuracaoSistema.find(x => x.descricao == "Sexta-Feira");
        this.sabado = this.configuracaoSistema.find(x => x.descricao == "Sábado");
        this.domingo = this.configuracaoSistema.find(x => x.descricao == "Domingo");
      }
    })
  }
  

  editaConfiguracao(conf: any) {
    this.configuracaoService.putConfiguracao(conf).subscribe(x => {

    });
  }

  atualizarHorario() {
    this.editaConfiguracao(this.segunda);
    this.editaConfiguracao(this.terca);
    this.editaConfiguracao(this.quarta);
    this.editaConfiguracao(this.quinta);
    this.editaConfiguracao(this.sexta);
    this.editaConfiguracao(this.sabado);
    this.editaConfiguracao(this.domingo);

    this.reload();
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/configuracao']);
    });
}

}
