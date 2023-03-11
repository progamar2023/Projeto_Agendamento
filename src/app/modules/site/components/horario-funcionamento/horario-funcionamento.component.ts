import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Configuracao } from 'src/app/model/Configuracao';

@Component({
  selector: 'app-horario-funcionamento',
  templateUrl: './horario-funcionamento.component.html',
  styleUrls: ['./horario-funcionamento.component.css']
})
export class HorarioFuncionamentoComponent implements OnInit {
public configuracoes: Configuracao[] = [];
public horarios: Configuracao[] = [];


constructor(public dialogRef: MatDialogRef<HorarioFuncionamentoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {

    if(data && data.configuracoes) {
      this.configuracoes = data.configuracoes;
    }
}
  ngOnInit(): void {
    this.horarios = this.configuracoes.filter(x => x.tipo == "Configuracao-horario" && x.valor == "true").sort();
  }

  formataTime(time: any) {
    return new Date('0000-01-01T' + time);
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
