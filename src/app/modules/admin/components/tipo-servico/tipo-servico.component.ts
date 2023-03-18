import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoServico } from 'src/app/model/Servico';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';
import { AdicionarTipoServicoComponent } from '../modal/adicionar-tipo-servico/adicionar-tipo-servico.component';

@Component({
  selector: 'app-tipo-servico',
  templateUrl: './tipo-servico.component.html',
  styleUrls: ['./tipo-servico.component.css']
})
export class TipoServicoComponent implements OnInit {
  public paginaAtual = 1;
  public tipoServicos: TipoServico[] = [];
  
  
  constructor(private tipoServicoService: TipoServicoService, private dialog: MatDialog, private notificacao: NotificacaoService) {}
  
  ngOnInit() {
    this.getTipoServico();
  }
  
  getTipoServico() {
    this.tipoServicoService.getTiposServico().subscribe(x => {
      if(x) {
        this.tipoServicos = JSON.parse(JSON.stringify(x)) as TipoServico[];
      }
    })
  }

  abreModalAddTipoServico() {
      const dialogRef = this.dialog.open(AdicionarTipoServicoComponent,  {
        data: {
          titulo: 'Cadastrar Tipo de Serviço'
        },
        height: '300px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          this.getTipoServico();
        });
  }

    editeTipoServico(servico: any) {
      const dialogRef = this.dialog.open(AdicionarTipoServicoComponent,  {
        data: {
          titulo: 'Editar Tipo de Serviço ' + servico.id,
          servico: servico
        },
        height: '300px',
        width: '800px'
      });
    
        dialogRef.afterClosed().subscribe(resposta => {
          this.getTipoServico();
        });
    }

    deletaTipoServico(servico: any) {
      this.tipoServicoService.delTipoServico(servico.id).subscribe( x => {
          this.getTipoServico();
          this.notificacao.showSuccess('Excluido com sucesso!', 'Deletado');
      })
    }
}
