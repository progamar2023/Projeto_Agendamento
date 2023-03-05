import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { TipoServico } from '../model/Servico';

@Injectable({
  providedIn: 'root'
})
export class TipoServicoService {

  url = 'https://localhost:7197/api/TipoServicos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getTiposServico(): Observable<TipoServico[]> {
    return this.httpClient.get<TipoServico[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdTipoServico(id: number): Observable<TipoServico> {
    return this.httpClient.get<TipoServico>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postTipoServico(TipoServico: TipoServico): Observable<TipoServico> {
    return this.httpClient.post<TipoServico>(this.url, JSON.stringify(TipoServico), this.httpOptions)
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
    return throwError(errorMessage);
  };
}
