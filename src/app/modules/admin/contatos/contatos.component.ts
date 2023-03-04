import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/Contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
public paginaAtual = 1;
public contatos: Contato[] = [];


constructor(private contatoService: ContatoService) {}

ngOnInit() {
  this.getContatos();
}

getContatos() {
  this.contatoService.getContatos().subscribe(x => {
    if(x) {
      this.contatos = JSON.parse(JSON.stringify(x)) as Contato[];
    }
  })
}


}
