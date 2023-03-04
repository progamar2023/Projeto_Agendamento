import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

import { InicialComponent } from './modules/site/inicial/inicial.component';
import { ServicoComponent } from './modules/site/components/servico/servico.component';
import { ContatoComponent } from './modules/site/components/contato/contato.component';
import { AgendamentoComponent } from './modules/site/agendamento/agendamento.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { MenuComponent } from './modules/site/components/menu/menu.component';
import { AgendaComponent } from './modules/admin/agenda/agenda.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfiguracoesComponent } from './modules/admin/configuracoes/configuracoes.component';
import { ServicosComponent } from './modules/admin/components/servicos/servicos.component';
import { TipoServicosComponent } from './modules/admin/components/tipo-servicos/tipo-servicos.component';
import { ConfiguracaoHorarioComponent } from './modules/admin/components/configuracao-horario/configuracao-horario.component';
import { UsuarioComponent } from './modules/admin/usuario/usuario.component';
import { FormUsuarioComponent } from './modules/admin/form-usuario/form-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatosComponent } from './modules/admin/contatos/contatos.component';
import { PainelComponent } from './modules/admin/inicial/inicial.component';
import { MenuAdminComponent } from './modules/admin/components/menu/menu.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    ServicoComponent,
    ContatoComponent,
    AgendamentoComponent,
    LoginComponent,
    MenuComponent,
    AgendaComponent,
    ConfiguracoesComponent,
    ServicosComponent,
    TipoServicosComponent,
    ConfiguracaoHorarioComponent,
    UsuarioComponent,
    FormUsuarioComponent,
    PainelComponent,
    ContatosComponent,
    MenuAdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatIconModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
