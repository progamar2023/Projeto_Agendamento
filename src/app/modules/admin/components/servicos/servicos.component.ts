import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servico, ServicoRequest } from 'src/app/model/Servico';
import { ContatoService } from 'src/app/services/contato.service';
import { ServicoService } from 'src/app/services/servico.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { ModalAdicionarServicoComponent } from '../modal/modal-adicionar-servico/modal-adicionar-servico.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  public paginaAtual = 1;
  public servicos: ServicoRequest[] = [];
  
  
  constructor(private servicoService: ServicoService, private dialog: MatDialog, private notificacao: NotificacaoService) {}
  
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

  abreModalAddServico() {
      const dialogRef = this.dialog.open(ModalAdicionarServicoComponent,  {
        data: {
          titulo: 'Cadastrar Serviço'
        },
        height: '600px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          this.getServicos();
        });
  }

    editeServico(servico: any) {
      const dialogRef = this.dialog.open(ModalAdicionarServicoComponent,  {
        data: {
          titulo: 'Editar Serviço ' + servico.id,
          servico: servico
        },
        height: '600px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          this.getServicos();
          this.notificacao.showSuccess('Alterado com sucesso!', 'Editado');
        });
    }

    deletaServico(servico: any) {
      this.servicoService.delServico(servico.id).subscribe( x => {
          this.getServicos();
          this.notificacao.showSuccess('Excluido com sucesso!', 'Deletado');
      })
    }

}
