import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { NotificacaoService } from 'src/app/services/shared/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  login: Login = new Login();

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router,  private notificacao: NotificacaoService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      Email: new FormControl(this.login.Email, [Validators.email, Validators.required]),
      Senha: new FormControl(this.login.Senha, Validators.required)
    });
  }

  onSubmit(login: Login) {
    this.loginService.login(login).subscribe(x => {
      if(x !== undefined) {
        localStorage.setItem('usuario', JSON.stringify(x));
        this.router.navigateByUrl('/admin');
      }
    }, (erro) => {
        this.notificacao.showError("Usuário/ Senha incorretos", "Falha no Login");
    })
  }
}
