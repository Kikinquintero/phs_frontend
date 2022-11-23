
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Global } from '../global'; 
// import { Email } from '../interfaces/email';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
 constructor(private httpClient: HttpClient) { }


 private _apiUrl = Global.apiUrl+"api/productosvendidos/user";

  

}

