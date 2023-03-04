import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Login, Usuario } from '../model/Usuario';
import { Contato } from '../model/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url = 'https://localhost:7197/api/Contatos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getContatos(): Observable<Contato[]> {
    return this.httpClient.get<Contato[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdContato(id: number): Observable<Contato> {
    return this.httpClient.get<Contato>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postContato(Contato: Contato): Observable<Contato> {
    return this.httpClient.post<Contato>(this.url, JSON.stringify(Contato), this.httpOptions)
      .pipe(
        retry(2),
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
