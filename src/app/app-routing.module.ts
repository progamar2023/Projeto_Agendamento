import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './modules/admin/agenda/agenda.component';
import { ConfiguracoesComponent } from './modules/admin/configuracoes/configuracoes.component';
import { ContatosComponent } from './modules/admin/contatos/contatos.component';
import { PainelComponent } from './modules/admin/inicial/inicial.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { UsuarioComponent } from './modules/admin/usuario/usuario.component';
import { AgendamentoComponent } from './modules/site/agendamento/agendamento.component';
import { InicialComponent } from './modules/site/inicial/inicial.component';

const routes: Routes = [
  { path: 'home', component: InicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/agendamento', component: AgendamentoComponent },
  { path: 'admin', component:  PainelComponent},
  { path: 'admin/agenda', component: AgendaComponent },
  { path: 'admin/contatos', component: ContatosComponent },
  { path: 'admin/configuracao', component: ConfiguracoesComponent },
  { path: 'admin/usuarios', component: UsuarioComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
 
 }


