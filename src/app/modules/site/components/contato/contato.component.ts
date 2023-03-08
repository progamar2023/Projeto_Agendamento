import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Configuracao } from 'src/app/model/Configuracao';
import { Contato } from 'src/app/model/Contato';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';
import { ContatoService } from 'src/app/services/contato.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  form: FormGroup = new FormGroup({});
  contato: Contato = new Contato();
  configuracaoSistema: Configuracao[] = [];
  corSite?: Configuracao = new Configuracao();


  constructor(private contatoService: ContatoService, private notificacao: NotificacaoService, private configuracaoService: ConfiguracoesService) {}
  
  ngOnInit() {
    this.createForm();
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.configuracaoService.getConfiguracoes().subscribe(x => {
      if(x) {
        
        this.configuracaoSistema = JSON.parse(JSON.stringify(x)) as Configuracao[];
        this.corSite = this.configuracaoSistema.find(x => x.tipo == "Configuracao-Site-Cor");
      
      }
    })
  }

  private createForm() {
   return this.form = new FormGroup({
      Nome: new FormControl(this.contato.nome, [Validators.required]),
      Email: new FormControl(this.contato.email, [Validators.email, Validators.required]),
      Assunto: new FormControl(this.contato.assunto == null ? 0 : this.contato.assunto, Validators.required),
      Mensagem: new FormControl(this.contato.mensagem, Validators.required)
    });
  }

  onSubmit(contato: Contato) {
    this.contatoService.postContato(contato).subscribe(x => {
      if(x !== undefined) {
        this.notificacao.showSuccess('Contato enviado com sucesso!', 'Enviado');
        this.form = this.createForm();
      }
    })
  }
}
