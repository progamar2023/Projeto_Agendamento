import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  ngOnInit(): void {
    
  }

  atualizaPagina(atualiza: any) {
    if(atualiza) {
      location.reload();
    }
   
  }
}
