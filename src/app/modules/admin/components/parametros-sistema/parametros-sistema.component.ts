import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracao } from 'src/app/model/Configuracao';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-parametros-sistema',
  templateUrl: './parametros-sistema.component.html',
  styleUrls: ['./parametros-sistema.component.css']
})
export class ParametrosSistemaComponent implements OnInit {
  configuracaoSistema: Configuracao[] = [];
  @Output() atualizou = new EventEmitter<boolean>();
  
  constructor(private configuracaoService: ConfiguracoesService, private changeDetector:ChangeDetectorRef, private router: Router) {

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

        this.configuracaoSistema.forEach(element => {
           if(element.imagemBase64 != "") {
                element.imagemBase64 = ""
           }
        });
      }
    })
  }


  editaConfiguracao(configuracao: any) {
    this.configuracaoService.putConfiguracao(configuracao).subscribe(x => {
      if(x) {
        this.atualizou.emit(true);
      }
    })
  }

  atualizaCorSite(event: any) {
    this.corSite!.valor = event;
    this.editaConfiguracao(this.corSite);
  }

  atualizaLoja(event: any) {
    this.infoSalao!.descricao = event;
    this.editaConfiguracao(this.infoSalao);
  }

  atualizarParametros() {
    this.editaConfiguracao(this.sobre);
    this.editaConfiguracao(this.infoSalao);
    this.editaConfiguracao(this.infoSalao);
    this.editaConfiguracao(this.corSite);
    this.editaConfiguracao(this.galeriaFoto1);
    this.editaConfiguracao(this.galeriaFoto2);
    this.editaConfiguracao(this.galeriaFoto3);
    setTimeout(function(){
    }, 2000);
    this.reload();
  }

  imageUpload(event:any, local: string)
  {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
        if(local == "logo") {
          this.infoSalao!.imagemBase64 = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        if(local == "sobre") {
          this.sobre!.imagemBase64 = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        if(local == "foto1") {
          this.galeriaFoto1!.imagemBase64 = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        if(local == "foto2") {
          this.galeriaFoto2!.imagemBase64 = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        if(local == "foto3") {
          this.galeriaFoto3!.imagemBase64 = event.target.result.replace(/^data:image\/[a-z]+;base64,/, "");
        }
          
        this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  reload() {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/configuracao']);
      });
  }
}