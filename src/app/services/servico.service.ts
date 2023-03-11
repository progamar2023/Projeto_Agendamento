import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Servico, ServicoRequest } from '../model/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  url = 'https://localhost:7197/api/Servicos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getServicos(): Observable<ServicoRequest[]> {
    return this.httpClient.get<ServicoRequest[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdServico(id: number): Observable<Servico> {
    return this.httpClient.get<Servico>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postServico(Servico: Servico): Observable<Servico> {
    return this.httpClient.post<Servico>(this.url, JSON.stringify(Servico), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  delServico(id: number) {
    return this.httpClient.delete<Servico>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  putServico(Servico: Servico): Observable<Servico> {
    return this.httpClient.put<Servico>(`${this.url}/${Servico.id}`, JSON.stringify(Servico), this.httpOptions)
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
  };
}
