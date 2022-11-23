
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Global } from '../global'; 
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl = Global.apiUrl+"api/auth/";
  private _apiUrlVerifyEmail = Global.apiUrl+"api/email/verify/"
  private _apiUrlSMS = Global.apiUrl 

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     })
  }




  constructor(private httpClient: HttpClient) { }
  
   createUser(frmRegistro): Observable<Usuario> {
     return this.httpClient.post<Usuario>(this._apiUrl+"register", JSON.stringify(frmRegistro), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     )
   }
  
  
  login(frmLogin): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this._apiUrl+"login", JSON.stringify(frmLogin), this.httpOptions)
    .pipe(
      // catchError(this.errorHandler)
    )
  }



  profileUser(): Observable<any> {
    return this.httpClient.post<any>(this._apiUrl+'user-profile',this.httpOptions)
    .pipe(
      // catchError(this.errorHandler)
    )
  }


 errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}