import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Configuracao } from '../model/Configuracao';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  url = 'https://localhost:7197/api/Configuracoes';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getConfiguracoes(): Observable<Configuracao[]> {
    return this.httpClient.get<Configuracao[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdConfiguracao(id: number): Observable<Configuracao> {
    return this.httpClient.get<Configuracao>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  putConfiguracao(Configuracao: Configuracao): Observable<Configuracao> {
    return this.httpClient.put<Configuracao>(`${this.url}/${Configuracao.id}`, JSON.stringify(Configuracao), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
    } else {
      
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
