import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Agendamento } from '../model/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  url = 'https://localhost:7197/api/Agendamentos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdAgendamento(id: number): Observable<Agendamento> {
    return this.httpClient.get<Agendamento>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postAgendamento(Agendamento: Agendamento): Observable<Agendamento> {
    return this.httpClient.post<Agendamento>(this.url, JSON.stringify(Agendamento), this.httpOptions)
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
