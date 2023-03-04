import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Login, Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://localhost:7197/api/Usuarios';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'mode': 'no-cors'})
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getIdUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postUsuario(Usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(Usuario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  login(login: Login): Observable<Usuario> {
    return this.httpClient.post(`${this.url}/Login`, login, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  putUsuario(Usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.url}/${Usuario.Id}`, JSON.stringify(Usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  delUsuario(id: number) {
    return this.httpClient.delete<Usuario>(`${this.url}/${id}`, this.httpOptions)
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
