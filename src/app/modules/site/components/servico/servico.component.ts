import { Component, Input, OnInit } from '@angular/core';
import { ServicoRequest } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  public servicos: ServicoRequest[] = [];
  
  @Input() corSite = '';
  constructor(private servicoService: ServicoService) {}
  
  ngOnInit() {
    this.getServicos();
  }
  
  getServicos() {
    this.servicoService.getServicos().subscribe(x => {
      if(x) {
        this.servicos = JSON.parse(JSON.stringify(x)) as ServicoRequest[];
      }
    })
  }
}
